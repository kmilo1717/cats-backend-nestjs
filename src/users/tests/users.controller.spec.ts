import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../presentation/controllers/users.controller';
import { UsersService } from '../application/services/users.service';
import { User } from '../domain/entities/user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUser: Omit<User, 'password'> = {
    id: 'user-id',
    email: 'test@example.com',
    username: 'testuser',
    firstName: 'Test',
    lastName: 'User',
  };

  const mockUsersService = {
    login: jest.fn(),
    register: jest.fn(),
  };

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
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should login user successfully', async () => {
      const loginDto = { email: 'test@example.com', password: 'password123' };
      mockUsersService.login.mockResolvedValue(mockUser);

      const result = await controller.login(loginDto);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockUser);
      expect(service.login).toHaveBeenCalledWith(loginDto.email, loginDto.password);
    });

    it('should handle login errors', async () => {
      const loginDto = { email: 'test@example.com', password: 'wrongpassword' };
      const errorMessage = 'Invalid credentials';
      mockUsersService.login.mockRejectedValue(new Error(errorMessage));

      const result = await controller.login(loginDto);

      expect(result.success).toBe(false);
      expect(result.error).toBe(errorMessage);
    });
  });

  describe('register', () => {
    it('should register user successfully', async () => {
      const registerDto = {
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
      };
      mockUsersService.register.mockResolvedValue(mockUser);

      const result = await controller.register(registerDto);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockUser);
      expect(service.register).toHaveBeenCalledWith(registerDto);
    });
  });
});