import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  userId!: string;

  @IsString()
  movieId!: string;

  @IsNumber()
  rating!: number;

  @IsOptional()
  @IsString()
  comment?: string;
}
