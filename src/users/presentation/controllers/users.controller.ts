import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from '../../application/services/users.service';
import { LoginDto } from '../../application/dto/login.dto';
import { RegisterDto } from '../../application/dto/register.dto';
import { ApiResponse } from '../../../shared/interfaces/api-response.interface';
import { User } from '../../domain/entities/user.entity';
import { createSuccessResponse, createErrorResponse } from '../../../shared/decorators/api-response.decorator';
import { Public } from 'src/shared/decorators/public.decorator';

/**
 * Users controller.
 */
@Controller()
export class UsersController {

  /**
   * Constructor for UsersController.
   * @param usersService - The users service.
   */
  constructor(private readonly usersService: UsersService) {}

  /**
   * Login a user.
   * @param loginDto - The login data.
   * @returns The logged-in user without the password.
   */
  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<ApiResponse<{ access_token: string; user: Omit<User, 'password'> }>> {
    try {
      const user = await this.usersService.login(loginDto);
      return createSuccessResponse(user, 'Login successful');
    } catch (error) {
      return createErrorResponse(error.message);
    }
  }

  /**
   * Register a new user.
   * @param registerDto - The registration data.
   * @returns The registered user without the password.
   */
  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<ApiResponse<Omit<User, 'password'> | null>> {
    try {
      const user = await this.usersService.register(registerDto);
      return createSuccessResponse(user, 'User registered successfully');
    } catch (error) {
      return createErrorResponse(error.message);
    }
  }
}