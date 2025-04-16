export class CreateMovieGraphCommand {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly genres: string[]
  ) {}
}
