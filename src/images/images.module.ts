import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ImagesController } from './presentation/controllers/images.controller';
import { ImagesService } from './application/services/images.service';
import { ImagesRepository } from './infrastructure/repositories/images.repository';
import { GetImagesByBreedUseCase } from './domain/use-cases/get-images-by-breed.use-case';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [ImagesController],
  providers: [
    ImagesService,
    {
      provide: 'IImagesRepository',
      useClass: ImagesRepository,
    },
    GetImagesByBreedUseCase,
  ],
})
export class ImagesModule {}