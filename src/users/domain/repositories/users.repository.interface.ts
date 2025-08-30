import { User } from '../entities/user.entity';

/**
 * Users repository interface.
 */
export interface IUsersRepository {
  /**
   * Find a user by email.
   * @param email - The email of the user.
   * @returns The user or null if not found.
   */
  findByEmail(email: string): Promise<User | null>;

  /**
   * Find a user by username.
   * @param username - The username of the user.
   * @returns The user or null if not found.
   */
  findByUsername(username: string): Promise<User | null>;

  /**
   * Create a new user.
   * @param user - The user to create.
   * @returns The created user.
   */
  create(user: User): Promise<User>;

  /**
   * Find a user by ID.
   * @param id - The ID of the user.
   * @returns The user or null if not found.
   */
  findById(id: string): Promise<User | null>;
}