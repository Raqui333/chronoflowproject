import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';

const mockUsersService = {
  create: jest.fn(),
};

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  describe('/users (POST)', () => {
    it('should resolve an createUserDto object', async () => {
      const createUserDto: Prisma.usersCreateInput = {
        name: 'John Doe',
        username: 'johndoe',
        email: 'john.doe@example.com',
        password: 'password123',
      };

      const expectedResolve = {
        id: 1,
        ...createUserDto,
        password: 'hashedpassword',
        created_at: new Date(),
      };

      mockUsersService.create.mockResolvedValue(expectedResolve);

      const result = await controller.create(createUserDto);

      expect(mockUsersService.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(expectedResolve);
    });
  });
});
