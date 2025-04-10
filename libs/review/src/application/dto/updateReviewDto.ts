import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateReviewDto {
  @IsString()
  userId!: string;

  @IsOptional()
  @IsNumber()
  rating?: number;

  @IsOptional()
  @IsString()
  comment?: string;
}
