export interface MovieListItemRelationRepository {
  createMovieListItemRelation(userId: string, movieId: string): Promise<void>;
  deleteMovieListItemRelation(userId: string, movieId: string): Promise<void>;
}
