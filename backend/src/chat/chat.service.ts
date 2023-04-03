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
    @InjectRepository(Chat) private userRepository: Repository<User>,
  ) {}
  async createMessage(createChatDto: CreateChatDto): Promise<Chat> {
    const senderId = createChatDto.senderId;
    const receiverId = createChatDto.receiverId;
    const chat = await this.chatRepository.create(createChatDto);
    chat.sender = await this.userRepository.findOneBy({ id: senderId });
    chat.receiver = await this.userRepository.findOneBy({ id: receiverId });
    return await this.chatRepository.save(createChatDto);
  }

  async getMessages(
    getMessagesDto: GetMessagesDto,
    senderId: number,
  ): Promise<Chat[]> {
    return await this.chatRepository.find({
      where: [
        {
          sender: { id: senderId },
          receiver: { id: getMessagesDto.receiverId },
        },
        {
          sender: { id: getMessagesDto.receiverId },
          receiver: { id: senderId },
        },
      ],
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
