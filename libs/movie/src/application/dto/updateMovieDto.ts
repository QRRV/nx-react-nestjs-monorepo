import { IsOptional, IsString, IsArray } from 'class-validator';

export class UpdateMovieDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  genres?: string[];

  @IsOptional()
  @IsString()
  releaseDate?: string;
}
