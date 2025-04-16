import { IsString, IsNumber, IsOptional, IsNotEmpty, Max, Min } from 'class-validator';

export class CreateReviewDto {

  @IsNotEmpty()
  @IsString()
  movieId!: string;

  @IsNumber()
  @Max(10)
  @Min(1)
  rating!: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  comment?: string;
}
