import { IsString, IsNotEmpty, IsOptional, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Data transfer object for retrieving images by cat breed.
 */
export class GetImagesByBreedDto {
  @IsString()
  @IsNotEmpty()
  breed_id: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number = 10;
}
