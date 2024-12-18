import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ConfigurationService } from '../configuration/configuration.service'; // Import ConfigurationService

@Controller('auth')
export class AuthController {
  constructor(private readonly configService: ConfigurationService) {} // Inject ConfigurationService
  /*
    // Start Google OAuth flow
  @Get('google')  // Route will be /api/auth/google
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // This redirects the user to Google's OAuth page
  }
     */
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {
    // Initiates the Google OAuth login flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req, @Res() res) {
    // Check if the user is logged in from Google

    // Manually store the user data in the session
    req.session.user = req.user;
    req.session.save((err) => {
      if (err) {
        console.error('Error saving session:', err);
      }
      const host = this.configService.getHost();
      res.redirect(`${host}/profile`);
    });
  }

  @Get('profile')
  getProfile(@Req() req) {
    if (req.session.user) {
      // console.log('Profile request session:', req.session.user);
      return { profile: req.session.user };
    } else {
      return { message: 'User is undefined' };
    }
  }
}
