import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService, // Inject ConfigService
  ) {}

  // todo
  async login(user: { email: string; userId: string }) {
    const payload = { username: user.email, sub: user.userId };

    // expire in..

    return {
      access_token: this.jwtService.sign(payload), // Generates JWT token
    };
  }
}
