import { Controller, Get, Param } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'
import { GetMovieByIdQuery } from '@moviebuddy/movie'

@Controller('movies')
export class GetMovieByIdController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetMovieByIdQuery(id))
  }
}
