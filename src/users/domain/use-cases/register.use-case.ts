import { Injectable, ConflictException, Inject } from '@nestjs/common';
import type { IUsersRepository } from '../repositories/users.repository.interface';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcryptjs';

/**
 * Use case for user registration.
 */
@Injectable()
export class RegisterUseCase {

  /**
   * Constructor for RegisterUseCase.
   * @param usersRepository - The users repository.
   */
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  /**
   * Execute the register use case.
   * @param userData - The user data for registration.
   * @returns The registered user without the password.
   */
  async execute(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<Omit<User, 'password'>> {
    const existingUserByEmail = await this.usersRepository.findByEmail(userData.email);
    if (existingUserByEmail) {
      throw new ConflictException('Email already exists');
    }

    // Check if username already exists
    const existingUserByUsername = await this.usersRepository.findByUsername(userData.username);
    if (existingUserByUsername) {
      throw new ConflictException('Username already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create the new user
    const newUser = await this.usersRepository.create({
      ...userData,
      password: hashedPassword,
    });

    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }
}