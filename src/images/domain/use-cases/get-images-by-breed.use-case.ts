import { Inject, Injectable } from '@nestjs/common';
import type { IImagesRepository } from '../repositories/images.repository.interface';
import { CatImage } from '../entities/cat-image.entity';

/**
 * Use case for retrieving images by cat breed.
 */
@Injectable()
export class GetImagesByBreedUseCase {

  /**
   * Constructor for the GetImagesByBreedUseCase.
   * @param imagesRepository - The images repository instance.
   */
  constructor(
    @Inject('IImagesRepository')
    private readonly imagesRepository: IImagesRepository,
  ) {}

  /**
   * Execute the use case.
   * @param breedId - The ID of the cat breed.
   * @param limit - The maximum number of images to retrieve.
   * @returns A list of cat images for the specified breed.
   */
  async execute(breedId: string, limit?: number): Promise<CatImage[]> {
    return await this.imagesRepository.getImagesByBreedId(breedId, limit);
  }
}