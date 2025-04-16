import { Movie } from '../entities/movie';
import { UpdateMovieDto } from '../../application/dto/updateMovieDto';

export interface MovieCommandRepository {
  create(movie: Movie): Promise<Movie>;
  update(id: string, dto: UpdateMovieDto): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}
