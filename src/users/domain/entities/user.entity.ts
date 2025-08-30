/**
 * User entity.
 */
export class User {
  id?: string;
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  createdAt?: Date;
  updatedAt?: Date;
}