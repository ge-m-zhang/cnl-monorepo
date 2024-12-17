import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AWSModule } from './aws/aws.module';
import { AWSService } from './aws/aws.service';
import { environment } from './environments/environment';
import { MessagesModule } from './message/message.module';
import { OpenAiController } from './openai/openai.controller';
import { OpenAiService } from './openai/openai.service';
import { TestModule } from './test/test.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [environment],
      isGlobal: true,
    }),
    AWSModule,
    AuthModule,
    MessagesModule,
    UserModule,
    TestModule,
  ],
  controllers: [AppController, OpenAiController],
  providers: [AppService, OpenAiService, AWSService],
})
export class AppModule {}
