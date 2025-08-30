import { CatImage } from '../entities/cat-image.entity';

/**
 * Interface for cat image repository.
 */
export interface IImagesRepository {
  /**
   * Get images by cat breed ID.
   * @param breedId - The ID of the cat breed.
   * @param limit - The maximum number of images to retrieve.
   * @returns A list of cat images for the specified breed.
   */
  getImagesByBreedId(breedId: string, limit?: number): Promise<CatImage[]>;
}
