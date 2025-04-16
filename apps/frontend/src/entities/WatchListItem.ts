export interface WatchListItem {
  id: string;
  userId: string;
  movieId: string;
  priority: number;
  watched: boolean;
  addedAt: Date;
}

export interface WatchListItemWithMovie extends WatchListItem {
  movieTitle: string;
}
