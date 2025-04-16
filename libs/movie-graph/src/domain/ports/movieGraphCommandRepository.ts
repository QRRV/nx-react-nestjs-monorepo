export interface MovieGraphCommandRepository {
  createMovieWithGenres(id: string, title: string, genres: string[]): Promise<void>;
}
