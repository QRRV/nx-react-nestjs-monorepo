export interface MovieGraphCommandRepository {
  createMovie(id: string, title: string, genres: string[], token: string): Promise<void>;
}
