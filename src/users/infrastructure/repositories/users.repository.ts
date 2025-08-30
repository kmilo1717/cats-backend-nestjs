import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUsersRepository } from '../../domain/repositories/users.repository.interface';
import { User } from '../../domain/entities/user.entity';
import { UserDocument } from '../schemas/user.schema';

/**
 * Users repository.
 */
@Injectable()
export class UsersRepository implements IUsersRepository {

  /**
   * Constructor for UsersRepository.
   * @param userModel - The user model.
   */
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  /**
   * Find a user by email.
   * @param email - The email of the user.
   * @returns The user or null if not found.
   */
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email }).exec();
    return user ? this.toEntity(user) : null;
  }

  /**
   * Find a user by username.
   * @param username - The username of the user.
   * @returns The user or null if not found.
   */
  async findByUsername(username: string): Promise<User | null> {
    const user = await this.userModel.findOne({ username }).exec();
    return user ? this.toEntity(user) : null;
  }

  /**
   * Create a new user.
   * @param user - The user to create.
   * @returns The created user.
   */
  async create(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    const savedUser = await createdUser.save();
    return this.toEntity(savedUser);
  }

  /**
   * Find a user by ID.
   * @param id - The ID of the user.
   * @returns The user or null if not found.
   */
  async findById(id: string): Promise<User | null> {
    const user = await this.userModel.findById(id).exec();
    return user ? this.toEntity(user) : null;
  }

  /**
   * Convert a user document to a user entity.
   * @param userDoc - The user document.
   * @returns The user entity.
   */
  private toEntity(userDoc: UserDocument): User {
    return {
      id: userDoc._id.toString(),
      email: userDoc.email,
      username: userDoc.username,
      password: userDoc.password,
      firstName: userDoc.firstName,
      lastName: userDoc.lastName,
    };
  }
}