// auth.module.ts
import { Injectable, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
// Import the Google strategy
import { PassportSerializer } from '@nestjs/passport';
import { ConfigurationModule } from 'src/configuration/configuration.modules';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/google.strategy';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: Express.User, done: (err: unknown, id?: string) => void) {
    done(null, JSON.stringify(user));
  }

  deserializeUser(
    payload: unknown,
    done: (err: unknown, user?: unknown) => void,
  ) {
    done(null, payload);
  }
}

@Module({
  imports: [
    PassportModule.register({ session: true }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
    ConfigurationModule,
  ],
  controllers: [AuthController],
  providers: [GoogleStrategy, AuthService, SessionSerializer],
})
export class AuthModule {}
