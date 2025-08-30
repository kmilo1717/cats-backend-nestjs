import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

/**
 * Data transfer object for user login.
 */
export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}