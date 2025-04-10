import { Controller, Get } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'
import { GetMoviesQuery } from '@moviebuddy/movie'

@Controller('movies')
export class GetMoviesController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async getAll() {
    return this.queryBus.execute(new GetMoviesQuery())
  }
}
