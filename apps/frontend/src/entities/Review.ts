export interface Review {
  _id: string;
  userId: string;
  movieId: string;
  rating: number;
  comment: string;
  reviewDate: Date;
}

export interface ReviewWithUsername extends Review {
  username?: string;
}

export interface ReviewWithMovieTitle extends Review {
  movieTitle?: string;
}
