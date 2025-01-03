import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

import { randomBytes, pbkdf2Sync } from 'crypto'; // for hashing the password

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  private errorMap = {
    P2002: {
      exception: ConflictException,
      message: 'Unique constraint violation',
      description: 'P2002',
    },
    P2025: {
      exception: NotFoundException,
      message: 'Record to delete does not exist',
      description: 'P2025',
    },
  };

  private prismaClientErrorHandle(error: Prisma.PrismaClientKnownRequestError) {
    // handle PrismaClient errors
    const mappedError = this.errorMap[error.code];
    if (mappedError) {
      throw new mappedError.exception(mappedError.message, {
        description: mappedError.description,
      });
    }
  }

  private hashPassword(password: string) {
    const salt = randomBytes(16).toString('hex');
    const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return `${hash}.${salt}`;
  }

  verifyPassword(password: string, hashedPassword: string) {
    const [originalHash, salt] = hashedPassword.split('.');
    const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return hash === originalHash;
  }

  async create(createUserDto: Prisma.usersCreateInput) {
    try {
      const { id } = await this.databaseService.users.create({
        data: {
          ...createUserDto,
          username: createUserDto.username.toLowerCase(), // normalize username
          password: this.hashPassword(createUserDto.password), // hashing password
          created_at: new Date(),
          last_login: new Date(),
        },
      });
      return { message: 'User successfully created!', user_id: id };
    } catch (error) {
      this.prismaClientErrorHandle(error); // handle PrismaClient errors
      throw error; // re-throw generic errors
    }
  }

  async findAll() {
    const users_array = await this.databaseService.users.findMany({
      omit: { password: true },
    });

    if (!users_array.length) throw new NotFoundException('No users found');
    return users_array;
  }

  async findOne(id: number) {
    const user = await this.databaseService.users.findUnique({
      where: { id },
      omit: { password: true },
    });

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findOneByUsername(username: string) {
    const user = await this.databaseService.users.findUnique({
      where: { username },
    });

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, updateUserDto: Prisma.usersUpdateInput) {
    // hashes the new password
    if (updateUserDto.password) {
      updateUserDto.password = this.hashPassword(
        updateUserDto.password.toString(),
      );
    }

    try {
      await this.databaseService.users.update({
        where: { id },
        data: updateUserDto,
      });
      return { message: 'User successfully updated!', user_id: id };
    } catch (error) {
      this.prismaClientErrorHandle(error); // handle PrismaClient errors
      throw error; // re-throw generic errors
    }
  }

  async delete(id: number) {
    try {
      const removed_user = await this.databaseService.users.delete({
        where: { id },
        omit: { password: true },
      });
      return removed_user;
    } catch (error) {
      this.prismaClientErrorHandle(error); // handle PrismaClient errors
      throw error; // re-throw generic errors
    }
  }
}
