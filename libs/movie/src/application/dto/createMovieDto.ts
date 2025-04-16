import { IsNotEmpty, IsString, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  genres!: string[];

  @IsString()
  @IsNotEmpty()
  releaseDate!: string;
}
