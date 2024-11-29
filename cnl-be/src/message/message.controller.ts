import { Controller, Post, Body, Get, Query, BadRequestException } from '@nestjs/common';
import { MessageService } from './message.service';
import { ChatMessage } from 'src/types/message.interface';


@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('save')
  async saveMessage(@Body() message: ChatMessage): Promise<{ message: string }> {
    await this.messageService.saveMessage(message);
    return { message: 'Message saved successfully' };
  }

  @Get('get-by-user')
  async getMessagesByUserId(@Query('userId') userId: string): Promise<ChatMessage[]> {
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }
  
    return this.messageService.getMessagesByUserId(userId);
  }
}
