import { Injectable } from '@nestjs/common';
import { GetBreedsUseCase } from '../../domain/use-cases/get-breeds.use-case';
import { GetBreedByIdUseCase } from '../../domain/use-cases/get-breed-by-id.use-case';
import { SearchBreedsUseCase } from '../../domain/use-cases/search-breeds.use-case';
import { Breed } from '../../domain/entities/breed.entity';

/**
 * Service for managing cat breeds
 */
@Injectable()
export class CatsService {

    /**
     * Constructor for CatsService
     * @param getBreedsUseCase - Use case for getting all breeds
     * @param getBreedByIdUseCase - Use case for getting a breed by ID
     * @param searchBreedsUseCase - Use case for searching breeds
     */
    constructor(
        private readonly getBreedsUseCase: GetBreedsUseCase,
        private readonly getBreedByIdUseCase: GetBreedByIdUseCase,
        private readonly searchBreedsUseCase: SearchBreedsUseCase,
    ) { }

    /**
     * Get all breeds
     */
    async getBreeds(): Promise<Breed[]> {
        return await this.getBreedsUseCase.execute();
    }

    /**
     * Get a breed by ID
     */
    async getBreedById(breedId: string): Promise<Breed> {
        return await this.getBreedByIdUseCase.execute(breedId);
    }

    /**
     * Search breeds
     */
    async searchBreeds(query: string): Promise<Breed[]> {
        return await this.searchBreedsUseCase.execute(query);
    }
}