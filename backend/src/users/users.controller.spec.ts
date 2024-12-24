import { Test, TestingModule } from '@nestjs/testing';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { CreateUserDto } from './dto/users.dto';
import { UpdateUserDto } from './dto/users.dto';

describe('UsersController', () => {
  const MockUsersService = {
    create: jest.fn(),
  };

  let controller: UsersController;
  let service: UsersService;

  const mockNewUserDto: CreateUserDto = {
    name: 'John Doe',
    username: 'johndoe',
    email: 'john.doe@example.com',
    password: 'password123',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: MockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  describe('/users (POST)', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('should return the new user', async () => {
      const expected_resolve = {
        id: 1,
        ...mockNewUserDto,
        password: 'password_hash',
        created_at: new Date(),
      };

      MockUsersService.create.mockResolvedValue(expected_resolve);

      const result = await controller.create(mockNewUserDto);

      expect(result).toEqual(expected_resolve);
      expect(service.create).toHaveBeenCalledWith(mockNewUserDto);
    });
  });
});
