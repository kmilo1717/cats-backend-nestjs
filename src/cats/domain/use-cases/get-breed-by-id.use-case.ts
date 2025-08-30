import { Inject, Injectable } from '@nestjs/common';
import type { ICatsRepository } from '../repositories/cats.repository.interface';
import { Breed } from '../entities/breed.entity';

/**
 * Use case for retrieving a cat breed by its ID.
 */
@Injectable()
export class GetBreedByIdUseCase {
  /**
   * Constructor for the GetBreedByIdUseCase.
   * @param catsRepository - The cat repository instance.
   */
  constructor(
    @Inject('ICatsRepository')
    private readonly catsRepository: ICatsRepository,
  ) {}

  /**
   * Execute the use case to retrieve a cat breed by its ID.
   * @param breedId - The ID of the cat breed to retrieve.
   * @returns The cat breed with the specified ID.
   */
  async execute(breedId: string): Promise<Breed> {
    return await this.catsRepository.getBreedById(breedId);
  }
}