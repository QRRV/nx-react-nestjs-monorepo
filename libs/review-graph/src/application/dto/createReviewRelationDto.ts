import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateReviewRelationDto {
  @IsString()
  @IsNotEmpty()
  movieId!: string;

  @IsNumber()
  rating!: number;

  @IsString()
  @IsNotEmpty()
  reviewId!: string;
}
