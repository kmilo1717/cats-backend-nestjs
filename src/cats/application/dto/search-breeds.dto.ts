import { IsString, IsNotEmpty } from 'class-validator';

/**
 * DTO for searching breeds
 */
export class SearchBreedsDto {

  /**
   * Search query
   */
  @IsString()
  @IsNotEmpty()
  q: string;
}