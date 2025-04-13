export interface WatchlistGraphCommandRepository {
  createMovieListItemRelation(
    movieId: string,
    itemId: string,
    token: string
  ): Promise<void>;

  deleteMovieListItemRelation(
    itemId: string,
    token: string
  ): Promise<void>;
}
