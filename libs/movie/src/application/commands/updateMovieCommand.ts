import { UpdateMovieDto } from '../dto/updateMovieDto';

export class UpdateMovieCommand {
  constructor(
    public readonly id: string,
    public readonly dto: UpdateMovieDto
  ) {}
}
