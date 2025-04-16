import { IsOptional, IsNumber, IsString, IsNotEmpty, Max, Min } from 'class-validator';

export class UpdateReviewDto {

  @IsOptional()
  @IsNumber()
  @Max(10)
  @Min(1)
  rating!: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  comment?: string;
}
