import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChatDto } from './dto/create-chat.dto';
import { GetMessagesDto } from './dto/get-messages.dto';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
  ) {}
  async createMessage(createChatDto: CreateChatDto): Promise<Chat> {
    return await this.chatRepository.save(createChatDto);
  }

  async getMessages(getMessagesDto: GetMessagesDto): Promise<Chat[]> {
    return await this.chatRepository.find({
      where: {
        senderFirstName: getMessagesDto.senderFirstName,
        senderLastName: getMessagesDto.senderLastName,
        receiverFirstName: getMessagesDto.receiverFirstName,
        receiverLastName: getMessagesDto.receiverLastName,
      },
    });
  }
}
