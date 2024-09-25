import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(user: any) {
    const payload = { username: user.email, sub: user.userId };
    
    return {
      access_token: this.jwtService.sign(payload),  // Generates JWT token
    };
  }
}