export interface MovieListItemRelationRepository {
  createMovieListItemRelation(userId: string, movieId: string, itemId: string): Promise<void>;
  deleteMovieListItemRelation(userId: string, itemId: string): Promise<void>;
}
