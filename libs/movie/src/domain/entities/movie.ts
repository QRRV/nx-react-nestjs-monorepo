export class Movie {
  constructor(
    public readonly _id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly releaseDate: Date,
    public readonly genres: string[]
  ) {
    if (!/^tt\d{7,8}$/.test(_id)) {
      throw new Error('Invalid IMDB ID format');
    }
  }
}
