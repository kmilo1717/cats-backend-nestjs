import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from '../application/services/cats.service';
import { GetBreedsUseCase } from '../domain/use-cases/get-breeds.use-case';
import { GetBreedByIdUseCase } from '../domain/use-cases/get-breed-by-id.use-case';
import { SearchBreedsUseCase } from '../domain/use-cases/search-breeds.use-case';

describe('CatsService', () => {
  let service: CatsService;
  let getBreedsUseCase: GetBreedsUseCase;
  let getBreedByIdUseCase: GetBreedByIdUseCase;
  let searchBreedsUseCase: SearchBreedsUseCase;

  const mockGetBreedsUseCase = {
    execute: jest.fn(),
  };

  const mockGetBreedByIdUseCase = {
    execute: jest.fn(),
  };

  const mockSearchBreedsUseCase = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: GetBreedsUseCase,
          useValue: mockGetBreedsUseCase,
        },
        {
          provide: GetBreedByIdUseCase,
          useValue: mockGetBreedByIdUseCase,
        },
        {
          provide: SearchBreedsUseCase,
          useValue: mockSearchBreedsUseCase,
        },
      ],
    }).compile();

    service = module.get<CatsService>(CatsService);
    getBreedsUseCase = module.get<GetBreedsUseCase>(GetBreedsUseCase);
    getBreedByIdUseCase = module.get<GetBreedByIdUseCase>(GetBreedByIdUseCase);
    searchBreedsUseCase = module.get<SearchBreedsUseCase>(SearchBreedsUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getBreeds', () => {
    it('should call GetBreedsUseCase', async () => {
      const expectedBreeds = [];
      mockGetBreedsUseCase.execute.mockResolvedValue(expectedBreeds);

      const result = await service.getBreeds();

      expect(result).toEqual(expectedBreeds);
      expect(getBreedsUseCase.execute).toHaveBeenCalled();
    });
  });

  describe('getBreedById', () => {
    it('should call GetBreedByIdUseCase with correct parameters', async () => {
      const breedId = 'abys';
      const expectedBreed = { id: breedId };
      mockGetBreedByIdUseCase.execute.mockResolvedValue(expectedBreed);

      const result = await service.getBreedById(breedId);

      expect(result).toEqual(expectedBreed);
      expect(getBreedByIdUseCase.execute).toHaveBeenCalledWith(breedId);
    });
  });

  describe('searchBreeds', () => {
    it('should call SearchBreedsUseCase with correct parameters', async () => {
      const query = 'persian';
      const expectedBreeds = [];
      mockSearchBreedsUseCase.execute.mockResolvedValue(expectedBreeds);

      const result = await service.searchBreeds(query);

      expect(result).toEqual(expectedBreeds);
      expect(searchBreedsUseCase.execute).toHaveBeenCalledWith(query);
    });
  });
});