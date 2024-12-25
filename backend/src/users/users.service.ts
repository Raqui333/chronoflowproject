import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

import { CreateUserDto } from './dto/users.dto';
import { UpdateUserDto } from './dto/users.dto';

import { createHash } from 'crypto'; // for hashing the password

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  private hashPassword(password: string) {
    return createHash('sha256').update(password).digest('hex');
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const created_user = await this.databaseService.users.create({
        data: {
          ...createUserDto,
          // nomalize username
          username: createUserDto.username.toLowerCase(),
          // hash the password before storing it in the database
          password: this.hashPassword(createUserDto.password),
        },
      });
      return created_user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // prevents table ID sequence from changing upon error
        await this.databaseService
          .$queryRaw`SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));`;

        throw new ConflictException(
          `Already exists a user with this ${error.meta.target[0]}`,
          { description: 'Unique constraint violation' },
        );
      }

      // re-throw generic errors
      throw error;
    }
  }

  async findAll() {
    const users_array = await this.databaseService.users.findMany();
    if (!users_array.length) throw new NotFoundException('No users found');
    return users_array;
  }

  async findOne(id: number) {
    const user = await this.databaseService.users.findUnique({
      where: { id },
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // hashes the new password
    if (updateUserDto.password) {
      updateUserDto.password = this.hashPassword(
        updateUserDto.password.toString(),
      );
    }

    try {
      const updated_user = await this.databaseService.users.update({
        where: { id },
        data: updateUserDto,
      });
      return updated_user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // prevents table ID sequence from changing upon error
        await this.databaseService.$queryRaw`
        SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));
      `;
        throw new ConflictException(
          `Already exists a user with this ${error.meta.target[0]}`,
          { description: 'Unique constraint violation' },
        );
      }

      // re-throw generic errors
      throw error;
    }
  }

  async delete(id: number) {
    try {
      const removed_user = await this.databaseService.users.delete({
        where: { id },
      });

      // make sure the new user ID is aways the next number after the last user
      await this.databaseService.$queryRaw`
      SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));
    `;

      return removed_user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError)
        throw new NotFoundException('User not found');

      // re-throw generic errors
      throw error;
    }
  }
}
