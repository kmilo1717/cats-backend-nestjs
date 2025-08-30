import { Controller, Get, Param, Query } from '@nestjs/common';
import { CatsService } from '../../application/services/cats.service';
import { SearchBreedsDto } from '../../application/dto/search-breeds.dto';
import { ApiResponse } from '../../../shared/interfaces/api-response.interface';
import { Breed } from '../../domain/entities/breed.entity';
import { createSuccessResponse, createErrorResponse } from '../../../shared/decorators/api-response.decorator';

/**
 * Controller for cat-related endpoints.
 */
@Controller('breeds')
export class CatsController {
    /**
     * Constructor for the CatsController.
     * @param catsService - The cat service instance.
     */
    constructor(private readonly catsService: CatsService) { }

    /**
     * Get all cat breeds.
     * @returns A list of all cat breeds.
     */
    @Get()
    async getBreeds(): Promise<ApiResponse<Breed[] | null>> {
        try {
            const breeds = await this.catsService.getBreeds();
            return createSuccessResponse(breeds, 'Breeds retrieved successfully');
        } catch (error) {
            return createErrorResponse(error.message);
        }
    }

    /**
     * Search for cat breeds.
     * @param searchDto - The search criteria.
     * @returns A list of cat breeds matching the search criteria.
     */
    @Get('search')
    async searchBreeds(@Query() searchDto: SearchBreedsDto): Promise<ApiResponse<Breed[] | null>> {
        try {
            const breeds = await this.catsService.searchBreeds(searchDto.q);
            return createSuccessResponse(breeds, 'Search completed successfully');
        } catch (error) {
            return createErrorResponse(error.message);
        }
    }

    /**
     * Get a cat breed by its ID.
     * @param breedId - The ID of the cat breed to retrieve.
     * @returns The cat breed with the specified ID.
     */
    @Get(':breed_id')
    async getBreedById(@Param('breed_id') breedId: string): Promise<ApiResponse<Breed | null>> {
        try {
            const breed = await this.catsService.getBreedById(breedId);
            return createSuccessResponse(breed, 'Breed retrieved successfully');
        } catch (error) {
            return createErrorResponse(error.message);
        }
    }
}