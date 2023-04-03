import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Res,
  Request,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { GetMessagesDto } from './dto/get-messages.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('')
  @Render('index')
  Home() {
    return;
  }

  @Post('/api')
  async Chat(
    @Res() res,
    @Body() getMessagesDto: GetMessagesDto,
    @Request() req,
  ) {
    const senderId = req.user['id'];
    const messages = await this.chatService.getMessages(
      getMessagesDto,
      senderId,
    );
    const name = await this.chatService.getName(getMessagesDto.receiverId);
    return res.status(200).send({
      senderId: senderId,
      ReceiverFirstName: name.first_name,
      ReceiverLastName: name.last_name,
      messages: messages,
    });
  }
}
