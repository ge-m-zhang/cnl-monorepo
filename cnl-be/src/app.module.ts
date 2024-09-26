import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

import { ConfigModule } from '@nestjs/config';
import { environment } from './environments/environment';
import { OpenAiController } from './openai/openai.controller';
import { OpenAiService } from './openai/openai.service';

@Module({
  imports: [ConfigModule.forRoot({
    load: [environment],
    isGlobal: true, 
  }),
  AuthModule,],
  controllers: [AppController, OpenAiController],
  providers: [AppService, OpenAiService],
})
export class AppModule {}
