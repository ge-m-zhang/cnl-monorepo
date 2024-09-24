// auth.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
 // Import the Google strategy

 @Module({
    imports: [
      ConfigModule.forRoot(),  // Load environment variables
      PassportModule.register({ session: true }),  // Use session for OAuth
      JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get<string>('JWT_SECRET'),  // Use JWT_SECRET from .env
          signOptions: { expiresIn: '1d' },  // Token expiration
        }),
      }),
    ],
    controllers: [AuthController],
    providers: [GoogleStrategy, AuthService],
  })
  export class AuthModule {}