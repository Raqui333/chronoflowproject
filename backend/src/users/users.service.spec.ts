import { Test, TestingModule } from '@nestjs/testing';

import { Prisma } from '@prisma/client';
import { UsersService } from './users.service';
import { DatabaseService } from '../database/database.service';

import { CreateUserDto } from './dto/users.dto';
import { UpdateUserDto } from './dto/users.dto';
import { ConflictException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let databaseService: DatabaseService;

  const MockDatabaseService = {
    $queryRaw: jest.fn(),
    users: {
      create: jest.fn(),
    },
  };

  const mockNewUserDto: CreateUserDto = {
    name: 'John Doe',
    username: 'johndoe',
    email: 'john.doe@example.com',
    password: 'password123',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: DatabaseService,
          useValue: MockDatabaseService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    databaseService = module.get<DatabaseService>(DatabaseService);

    jest.spyOn<any, any>(service, 'hashPassword').mockReturnValue('hash');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('<service> create', () => {
    it('Should create a user and return it', async () => {
      const expected_resolve = {
        id: 1,
        ...mockNewUserDto,
        password: 'hash',
        created_at: new Date(),
      };

      MockDatabaseService.users.create.mockResolvedValue(expected_resolve);

      const result = await service.create(mockNewUserDto);

      expect(result).toEqual(expected_resolve);
      expect(databaseService.users.create).toHaveBeenCalledWith({
        data: {
          ...mockNewUserDto,
          password: 'hash',
        },
      });
    });

    it("Should handle error 'P2002 Unique constraint violation'", async () => {
      const prismaError = new Prisma.PrismaClientKnownRequestError(
        'mock error message',
        {
          clientVersion: '0.0.0',
          code: 'P2002',
          meta: {
            target: ['email'],
          },
        },
      );

      MockDatabaseService.users.create.mockRejectedValue(prismaError);

      try {
        await service.create(mockNewUserDto);
      } catch (error) {
        MockDatabaseService.$queryRaw.mockResolvedValue('query_made');

        // this query is essential to the code
        expect(databaseService.$queryRaw).toHaveBeenCalledWith(
          expect.arrayContaining([
            expect.stringContaining(
              "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));",
            ),
          ]),
        );

        expect(error).toBeInstanceOf(ConflictException);
        expect(error.message).toBe('Already exists a user with this email');
        expect(error.response.error).toBe('Unique constraint violation');
      }
    });

    it('Should re-throw generic errors', async () => {
      const genericError = new Error('generic');

      MockDatabaseService.users.create.mockRejectedValue(genericError);

      try {
        await service.create(mockNewUserDto);
      } catch (error) {
        expect(error).not.toBeInstanceOf(Prisma.PrismaClientKnownRequestError);
        expect(error.message).toBe('generic');
      }
    });
  });
});
