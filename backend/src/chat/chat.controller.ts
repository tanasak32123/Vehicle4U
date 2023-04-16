import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Res,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ChatService } from './chat.service';
import { GetMessagesDto } from './dto/get-messages.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('')
  @Render('index')
  Home() {
    return;
  }
  
  @UseGuards(JwtAuthGuard)
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
    const name = await this.chatService.getName(
      Number(getMessagesDto.receiverId),
    );
    return res.status(200).send({
      senderId: String(senderId),
      ReceiverFirstName: name.first_name,
      ReceiverLastName: name.last_name,
      messages: messages,
    });
  }
}
