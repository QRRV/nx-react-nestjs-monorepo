import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateReviewDto {

  @IsNotEmpty()
  @IsString()
  movieId!: string;

  @IsNumber()
  rating!: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  comment?: string;
}
