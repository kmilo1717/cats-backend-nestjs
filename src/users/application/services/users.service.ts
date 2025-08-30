import { Injectable } from '@nestjs/common';
import { LoginUseCase } from '../../domain/use-cases/login.use-case';
import { RegisterUseCase } from '../../domain/use-cases/register.use-case';
import { User } from '../../domain/entities/user.entity';
import { RegisterDto } from './../dto/register.dto';

/**
 * Service for user-related operations.
 */
@Injectable()
export class UsersService {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
  ) {}

  /**
   * Login a user.
   * @param email - The email of the user.
   * @param password - The password of the user.
   * @returns The logged-in user without the password.
   */
  async login(email: string, password: string): Promise<Omit<User, 'password'>> {
    return await this.loginUseCase.execute(email, password);
  }

  /**
   * Register a new user.
   * @param registerData - The registration data.
   * @returns The registered user without the password.
   */
  async register(registerData: RegisterDto): Promise<Omit<User, 'password'>> {
    return await this.registerUseCase.execute(registerData);
  }
}