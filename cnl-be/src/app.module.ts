import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigurationModule } from './configuration/configuration.modules';
import { ConfigModule } from '@nestjs/config';
import { environment } from './environments/environment';

@Module({
  imports: [ConfigModule.forRoot({
    load: [environment],
    isGlobal: true, 
  }),
  AuthModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
