import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { ICatsRepository } from '../../domain/repositories/cats.repository.interface';
import { Breed } from '../../domain/entities/breed.entity';

/**
 * Repository for cat-related data access.
 */
@Injectable()
export class CatsRepository implements ICatsRepository {

  /**
   * The base URL for the Cat API.
   */
  private readonly apiUrl = 'https://api.thecatapi.com/v1';

  /**
   * The API key for authenticating requests to the Cat API.
   */
  private readonly apiKey: string;

  /**
   * Constructor for the CatsRepository.
   * @param httpService - The HTTP service instance.
   * @param configService - The configuration service instance.
   */
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('CAT_API_KEY') || 'live_JBT0Ah0Nt12iyl2IpjQVLDWjcLk0GQwf4zI9wBMfmfejKmcC31mOJp4yJz5TsOUP';
  }

  /**
   * Get all cat breeds.
   * @returns A list of all cat breeds.
   */
  async getBreeds(): Promise<Breed[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/breeds`, {
          headers: {
            'x-api-key': this.apiKey,
          },
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Error fetching breeds from Cat API',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  /**
   * Get a cat breed by its ID.
   * @param breedId - The ID of the cat breed to retrieve.
   * @returns The cat breed with the specified ID.
   */
  async getBreedById(breedId: string): Promise<Breed> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/breeds/${breedId}`, {
          headers: {
            'x-api-key': this.apiKey,
          },
        }),
      );
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new HttpException(
          'Breed not found',
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        'Error fetching breed from Cat API',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  /**
   * Search for cat breeds by a query string.
   * @param query - The search query string.
   * @returns A list of cat breeds matching the search query.
   */
  async searchBreeds(query: string): Promise<Breed[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/breeds/search`, {
          params: { q: query },
          headers: {
            'x-api-key': this.apiKey,
          },
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Error searching breeds from Cat API',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}