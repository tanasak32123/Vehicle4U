import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
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
  async Chat(@Res() res, @Body() getMessagesDto: GetMessagesDto) {
    const messages = await this.chatService.getMessages(getMessagesDto);
    console.log(messages)
    return res.status(200).send({
      renterFirstName: getMessagesDto.renterFirstName,
      renterLastName: getMessagesDto.renterLastName,
      providerFirstName: getMessagesDto.providerFirstName,
      providerLastName: getMessagesDto.providerLastName,
      messages: messages,
    });
  }
}
