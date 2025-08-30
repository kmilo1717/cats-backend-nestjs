import { Injectable } from '@nestjs/common';
import { GetImagesByBreedUseCase } from '../../domain/use-cases/get-images-by-breed.use-case';
import { CatImage } from '../../domain/entities/cat-image.entity';

/**
 * Service for cat image-related operations.
 */
@Injectable()
export class ImagesService {
  constructor(
    private readonly getImagesByBreedUseCase: GetImagesByBreedUseCase,
  ) {}

  async getImagesByBreedId(breedId: string, limit?: number): Promise<CatImage[]> {
    return await this.getImagesByBreedUseCase.execute(breedId, limit);
  }
}