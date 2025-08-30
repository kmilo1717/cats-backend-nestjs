import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from '../presentation/controllers/cats.controller';
import { CatsService } from '../application/services/cats.service';
import { Breed } from '../domain/entities/breed.entity';

describe('CatsController', () => {
  let controller: CatsController;
  let service: CatsService;

  const mockBreed: Breed = {
    id: 'abys',
    name: 'Abyssinian',
    description: 'The Abyssinian is easy to care for, and a joy to have in your home.',
    temperament: 'Active, Energetic, Independent, Intelligent, Gentle',
    origin: 'Egypt',
    life_span: '14 - 15',
    indoor: 0,
    lap: 1,
    adaptability: 5,
    affection_level: 5,
    child_friendly: 3,
    dog_friendly: 4,
    energy_level: 5,
    grooming: 1,
    health_issues: 2,
    intelligence: 5,
    shedding_level: 2,
    social_needs: 5,
    stranger_friendly: 5,
    vocalisation: 1,
    experimental: 0,
    hairless: 0,
    natural: 1,
    rare: 0,
    rex: 0,
    suppressed_tail: 0,
    short_legs: 0,
    wikipedia_url: 'https://en.wikipedia.org/wiki/Abyssinian_cat',
    hypoallergenic: 0,
    reference_image_id: '0XYvRd7oD',
  };

  const mockCatsService = {
    getBreeds: jest.fn(),
    getBreedById: jest.fn(),
    searchBreeds: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        {
          provide: CatsService,
          useValue: mockCatsService,
        },
      ],
    }).compile();

    controller = module.get<CatsController>(CatsController);
    service = module.get<CatsService>(CatsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getBreeds', () => {
    it('should return a list of breeds', async () => {
      const expectedBreeds = [mockBreed];
      mockCatsService.getBreeds.mockResolvedValue(expectedBreeds);

      const result = await controller.getBreeds();

      expect(result.success).toBe(true);
      expect(result.data).toEqual(expectedBreeds);
      expect(result.message).toBe('Breeds retrieved successfully');
      expect(service.getBreeds).toHaveBeenCalled();
    });

    it('should handle errors', async () => {
      const errorMessage = 'API Error';
      mockCatsService.getBreeds.mockRejectedValue(new Error(errorMessage));

      const result = await controller.getBreeds();

      expect(result.success).toBe(false);
      expect(result.error).toBe(errorMessage);
    });
  });

  describe('getBreedById', () => {
    it('should return a specific breed', async () => {
      mockCatsService.getBreedById.mockResolvedValue(mockBreed);

      const result = await controller.getBreedById('abys');

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockBreed);
      expect(service.getBreedById).toHaveBeenCalledWith('abys');
    });
  });

  describe('searchBreeds', () => {
    it('should return search results', async () => {
      const searchQuery = { q: 'persian' };
      const expectedBreeds = [mockBreed];
      mockCatsService.searchBreeds.mockResolvedValue(expectedBreeds);

      const result = await controller.searchBreeds(searchQuery);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(expectedBreeds);
      expect(service.searchBreeds).toHaveBeenCalledWith('persian');
    });
  });
});