import { Movie } from '../entities/movie'

export interface MovieQueryRepository {
  findAll(): Promise<Movie[]>
  findById(id: string): Promise<Movie | null>
}
