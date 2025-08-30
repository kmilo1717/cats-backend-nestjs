import { Breed } from '../entities/breed.entity';

/**
 * Interface for cat-related data access methods.
 */
export interface ICatsRepository {
  getBreeds(): Promise<Breed[]>;
  getBreedById(breedId: string): Promise<Breed>;
  searchBreeds(query: string): Promise<Breed[]>;
}
