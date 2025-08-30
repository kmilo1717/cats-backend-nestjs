import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../application/services/users.service';
import { LoginUseCase } from '../domain/use-cases/login.use-case';
import { RegisterUseCase } from '../domain/use-cases/register.use-case';

describe('UsersService', () => {
  let service: UsersService;
  let loginUseCase: LoginUseCase;
  let registerUseCase: RegisterUseCase;

  const mockLoginUseCase = {
    execute: jest.fn(),
  };

  const mockRegisterUseCase = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: LoginUseCase,
          useValue: mockLoginUseCase,
        },
        {
          provide: RegisterUseCase,
          useValue: mockRegisterUseCase,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    loginUseCase = module.get<LoginUseCase>(LoginUseCase);
    registerUseCase = module.get<RegisterUseCase>(RegisterUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should call LoginUseCase with correct parameters', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const expectedUser = { id: '1', email, username: 'test' };
      mockLoginUseCase.execute.mockResolvedValue(expectedUser);

      const result = await service.login(email, password);

      expect(result).toEqual(expectedUser);
      expect(loginUseCase.execute).toHaveBeenCalledWith(email, password);
    });
  });

  describe('register', () => {
    it('should call RegisterUseCase with correct parameters', async () => {
      const registerData = {
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
      };
      const expectedUser = { id: '1', ...registerData };
      mockRegisterUseCase.execute.mockResolvedValue(expectedUser);

      const result = await service.register(registerData);

      expect(result).toEqual(expectedUser);
      expect(registerUseCase.execute).toHaveBeenCalledWith(registerData);
    });
  });
});
