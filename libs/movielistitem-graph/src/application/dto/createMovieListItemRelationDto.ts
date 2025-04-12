import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMovieListItemRelationDto {
  @IsString()
  @IsNotEmpty()
  movieId!: string;
}
