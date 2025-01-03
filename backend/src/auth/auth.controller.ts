import {
  Controller,
  HttpCode,
  Post,
  Get,
  Body,
  Request,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '@/decorators/custom.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
