import { Inject, Injectable } from '@nestjs/common';
import type { ICatsRepository } from '../repositories/cats.repository.interface';
import { Breed } from '../entities/breed.entity';

/**
 * Use case for searching cat breeds.
 */
@Injectable()
export class SearchBreedsUseCase {

  /**
   * Constructor for the SearchBreedsUseCase.
   * @param catsRepository - The cat repository instance.
   */
  constructor(
    @Inject('ICatsRepository')
    private readonly catsRepository: ICatsRepository,
  ) {}

  /**
   * Execute the use case to search for cat breeds.
   * @param query - The search query string.
   * @returns A list of cat breeds matching the search query.
   */
  async execute(query: string): Promise<Breed[]> {
    return await this.catsRepository.searchBreeds(query);
  }
}