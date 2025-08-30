import { Inject, Injectable } from '@nestjs/common';
import type { ICatsRepository } from '../repositories/cats.repository.interface';
import { Breed } from '../entities/breed.entity';

/**
 * Use case for retrieving all cat breeds.
 */
@Injectable()
export class GetBreedsUseCase {

  /**
   * Constructor for the GetBreedsUseCase.
   * @param catsRepository - The cat repository instance.
   */
  constructor(
    @Inject('ICatsRepository')
    private readonly catsRepository: ICatsRepository,
  ) {}

  /**
   * Execute the use case to retrieve all cat breeds.
   * @returns A list of all cat breeds.
   */
  async execute(): Promise<Breed[]> {
    return await this.catsRepository.getBreeds();
  }
}