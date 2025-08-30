/**
 * Entity representing a cat image.
 */
export class CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds?: {
    id: string;
    name: string;
    temperament?: string;
    origin?: string;
  }[];
}