import { Body, Controller, Get, Render, Res } from '@nestjs/common';
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

  @Get('/api')
  async Chat(@Res() res, @Body() getMessagesDto: GetMessagesDto) {
    const messages = await this.chatService.getMessages(getMessagesDto);
    res.json(messages);
  }
}
