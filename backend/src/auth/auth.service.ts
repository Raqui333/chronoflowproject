import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: Prisma.usersCreateInput): Promise<any> {
    return this.usersService.create(createUserDto);
  }

  async login(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);

    if (!this.usersService.verifyPassword(password, user?.password))
      throw new UnauthorizedException('Invalid credentials');

    await this.usersService.update(user.id, { last_login: new Date() });
    const payload = { username: user.username, id: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
