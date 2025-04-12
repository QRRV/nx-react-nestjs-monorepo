import { Controller, Get, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs'
import { GetMoviesQuery } from '@moviebuddy/movie'
import { JwtAuthGuard } from '@moviebuddy/auth';

@Controller('movies')
export class GetMoviesController {
  constructor(private readonly queryBus: QueryBus) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.queryBus.execute(new GetMoviesQuery())
  }
}
