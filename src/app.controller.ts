import { Controller, Get, Post, Request, Redirect, UseGuards } from '@nestjs/common';
import { ApiBody, ApiProperty } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';

class User {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Get()
  @Redirect('docs')
  getHello(): any {
    return { url: process.env.SWAGGER_URL };
  }

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: User })
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}
