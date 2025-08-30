import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import type { IUsersRepository } from '../repositories/users.repository.interface';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcryptjs';

/**
 * Use case for user login.
 */
@Injectable()
export class LoginUseCase {

  /**
   * Constructor for LoginUseCase.
   * @param usersRepository - The users repository.
   */
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  /**
   * Execute the login use case.
   * @param email - The email of the user.
   * @param password - The password of the user.
   * @returns The user without the password.
   */
  async execute(email: string, password: string): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepository.findByEmail(email);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}