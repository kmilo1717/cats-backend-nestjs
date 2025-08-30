import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { CatsController } from './presentation/controllers/cats.controller';
import { CatsService } from './application/services/cats.service';
import { CatsRepository } from './infrastructure/repositories/cats.repository';
import { GetBreedsUseCase } from './domain/use-cases/get-breeds.use-case';
import { GetBreedByIdUseCase } from './domain/use-cases/get-breed-by-id.use-case';
import { SearchBreedsUseCase } from './domain/use-cases/search-breeds.use-case';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [CatsController],
  providers: [
    CatsService,
    {
      provide: 'ICatsRepository',
      useClass: CatsRepository,
    },
    GetBreedsUseCase,
    GetBreedByIdUseCase,
    SearchBreedsUseCase,
  ],
})
export class CatsModule {}