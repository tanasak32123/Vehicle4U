import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateChatDto } from './dto/create-chat.dto';
import { GetMessagesDto } from './dto/get-messages.dto';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async createMessage(createChatDto: CreateChatDto): Promise<Chat> {
    const senderId = createChatDto.senderId;
    const receiverId = createChatDto.receiverId;
    const chat = await this.chatRepository.create(createChatDto);
    chat.sender = await this.userRepository.findOneBy({ id: Number(senderId) });
    chat.receiver = await this.userRepository.findOneBy({
      id: Number(receiverId),
    });
    return await this.chatRepository.save(chat);
  }

  async getMessages(getMessagesDto: GetMessagesDto, senderId: number) {
    return await this.chatRepository.find({
      relations: {
        sender: true,
        receiver: true,
      },
      select: {
        sender: { id: true },
        receiver: { id: true },
      },
      where: [
        {
          sender: { id: senderId },
          receiver: { id: Number(getMessagesDto.receiverId) },
        },
        {
          sender: { id: Number(getMessagesDto.receiverId) },
          receiver: { id: senderId },
        },
      ],
      order: {
        createdAt: 'ASC',
      },
    });
  }

  async getName(senderId: number) {
    return await this.userRepository.findOne({
      select: {
        first_name: true,
        last_name: true,
      },
      where: {
        id: senderId,
      },
    });
  }
}
