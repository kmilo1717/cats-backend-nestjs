import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { IImagesRepository } from '../../domain/repositories/images.repository.interface';
import { CatImage } from '../../domain/entities/cat-image.entity';

/**
 * Repository for cat image-related operations.
 */
@Injectable()
export class ImagesRepository implements IImagesRepository {

  /**
   * The base URL for the Cat API.
   */
  private readonly apiUrl = 'https://api.thecatapi.com/v1';

  /**
   * The API key for authenticating requests to the Cat API.
   */
  private readonly apiKey: string;

  /**
   * Constructor for the ImagesRepository.
   * @param httpService - The HTTP service instance.
   * @param configService - The config service instance.
   */
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('CAT_API_KEY') || 'live_JBT0Ah0Nt12iyl2IpjQVLDWjcLk0GQwf4zI9wBMfmfejKmcC31mOJp4yJz5TsOUP';
  }

  /**
   * Get images by cat breed ID.
   * @param breedId - The ID of the cat breed.
   * @param limit - The maximum number of images to retrieve.
   * @returns A list of cat images for the specified breed.
   */
  async getImagesByBreedId(breedId: string, limit: number = 10): Promise<CatImage[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/images/search`, {
          params: {
            breed_ids: breedId,
            limit,
            has_breeds: 1,
          },
          headers: {
            'x-api-key': this.apiKey,
          },
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Error fetching images from Cat API',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}