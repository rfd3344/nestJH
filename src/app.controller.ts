import { Controller, Get, Post, Request, Redirect, UseGuards } from '@nestjs/common';
import { ApiBody, ApiProperty } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';

import { hashSync, compareSync } from 'bcrypt';

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
  async testRoute(): Promise<any> {

    const password = 'random_password';
    const passwordHash =  hashSync(password, 10);


    const isMatch =  compareSync('random_password', passwordHash);

    console.warn('password',  passwordHash, isMatch)
    return `<a href="${process.env.SWAGGER_URL}">Go to Swagger Docs</a>`;
  }

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: User })
  @Post('auth/login')
  async login(@Request() req) {
    console.warn('login', req.user)
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}
