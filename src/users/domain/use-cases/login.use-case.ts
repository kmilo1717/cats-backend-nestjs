import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import type { IUsersRepository } from '../repositories/users.repository.interface';
import { User } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from 'src/users/application/dto/login.dto';

/**
 * Use case for user login.
 */
@Injectable()
export class LoginUseCase {

  /**
   * Constructor for LoginUseCase.
   * @param usersRepository - The users repository.
   * @param jwtService - The JWT service.
   */
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Execute the login use case.
   * @param email - The email of the user.
   * @param password - The password of the user.
   * @returns The access token and user data without password.
   */
  async execute(
    login: LoginDto
  ): Promise<{ access_token: string; user: Omit<User, 'password'> }> {
    const user = await this.usersRepository.findByEmail(login.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(login.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Elimina el password del objeto antes de devolverlo
    const { password: _, ...userWithoutPassword } = user;

    // Payload para el token
    const payload = { sub: user.id, email: user.email, username: user.username };

    // Firmar el token
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: userWithoutPassword,
    };
  }
}
