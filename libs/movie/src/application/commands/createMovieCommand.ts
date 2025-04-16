import { CreateMovieDto } from '../dto/createMovieDto';

export class CreateMovieCommand {
  constructor(public readonly dto: CreateMovieDto, public readonly token:string) {}
}
