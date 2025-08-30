import { Test, TestingModule } from '@nestjs/testing';
import { ImagesController } from '../presentation/controllers/images.controller';
import { ImagesService } from '../application/services/images.service';
import { CatImage } from '../domain/entities/cat-image.entity';

/**
 * Test suite for the ImagesController.
 */
describe('ImagesController', () => {
  let controller: ImagesController;
  let service: ImagesService;

  const mockImage: CatImage = {
    id: 'test-id',
    url: 'https://example.com/cat.jpg',
    width: 500,
    height: 500,
    breeds: [{
      id: 'abys',
      name: 'Abyssinian',
      temperament: 'Active, Energetic',
      origin: 'Egypt',
    }],
  };

  const mockImagesService = {
    getImagesByBreedId: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImagesController],
      providers: [
        {
          provide: ImagesService,
          useValue: mockImagesService,
        },
      ],
    }).compile();

    controller = module.get<ImagesController>(ImagesController);
    service = module.get<ImagesService>(ImagesService);
  });

  /**
   * Test for the ImagesController.
   */
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  /**
   * Test for the getImagesByBreedId method.
   */
  describe('getImagesByBreedId', () => {
    it('should return images for a specific breed', async () => {
      const queryDto = { breed_id: 'abys', limit: 10 };
      const expectedImages = [mockImage];
      mockImagesService.getImagesByBreedId.mockResolvedValue(expectedImages);

      const result = await controller.getImagesByBreedId(queryDto);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(expectedImages);
      expect(service.getImagesByBreedId).toHaveBeenCalledWith('abys', 10);
    });

    it('should handle errors', async () => {
      const queryDto = { breed_id: 'invalid', limit: 10 };
      const errorMessage = 'Breed not found';
      mockImagesService.getImagesByBreedId.mockRejectedValue(new Error(errorMessage));

      const result = await controller.getImagesByBreedId(queryDto);

      expect(result.success).toBe(false);
      expect(result.error).toBe(errorMessage);
    });
  });
});