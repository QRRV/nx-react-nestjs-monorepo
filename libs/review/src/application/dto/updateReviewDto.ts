import { IsOptional, IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class UpdateReviewDto {

  @IsOptional()
  @IsNumber()
  rating?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  comment?: string;
}
