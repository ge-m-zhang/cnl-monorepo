import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { AWSService } from '../aws/aws.service';

@Module({
  controllers: [MessageController],
  providers: [MessageService, AWSService],
})
export class MessagesModule {}
