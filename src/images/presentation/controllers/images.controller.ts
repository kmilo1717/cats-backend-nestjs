import { Controller, Get, Query } from '@nestjs/common';
import { ImagesService } from '../../application/services/images.service';
import { GetImagesByBreedDto } from '../../application/dto/get-images-by-breed.dto';
import { ApiResponse } from '../../../shared/interfaces/api-response.interface';
import { CatImage } from '../../domain/entities/cat-image.entity';
import { createSuccessResponse, createErrorResponse } from '../../../shared/decorators/api-response.decorator';

/**
 * Controller for cat image-related operations.
 */
@Controller('imagesbybreedid')
export class ImagesController {

  /**
   * Constructor for the ImagesController.
   * @param imagesService - The images service instance.
   */
  constructor(private readonly imagesService: ImagesService) {}

  /**
   * Get images by cat breed ID.
   * @param getImagesDto - The DTO containing the breed ID and optional limit.
   * @returns A promise that resolves to the API response containing the cat images.
   */
  @Get()
  async getImagesByBreedId(@Query() getImagesDto: GetImagesByBreedDto): Promise<ApiResponse<CatImage[]>> {
    try {
      const images = await this.imagesService.getImagesByBreedId(
        getImagesDto.breed_id,
        getImagesDto.limit,
      );
      return createSuccessResponse(images, 'Images retrieved successfully');
    } catch (error) {
      return createErrorResponse(error.message);
    }
  }
}