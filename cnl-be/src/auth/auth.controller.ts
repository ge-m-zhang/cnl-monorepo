import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {

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
  googleAuthRedirect(@Req() req, @Res() res: Response) {
    
    const user = req.user;  // Retrieved from the GoogleStrategy
    // Store session or return JWT here
    res.redirect('/api/auth/profile');  // Redirect after successful login
  }
  
/*
  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.logout();
    res.redirect('/');
  }
*/
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;  // Return user data stored in session
  }
}