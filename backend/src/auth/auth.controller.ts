import { Controller, HttpCode, Post, Get, Body, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '@/decorators/custom.decorator';
import { Prisma } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  register(@Body() createUserDto: Prisma.usersCreateInput) {
    return this.authService.register(createUserDto);
  }

  @Public()
  @HttpCode(200)
  @Post('login')
  login(@Body() body: { username: string; password: string }) {
    return this.authService.login(body.username, body.password);
  }

  @Get('test')
  test(@Request() req: any) {
    return req.user;
  }
}
