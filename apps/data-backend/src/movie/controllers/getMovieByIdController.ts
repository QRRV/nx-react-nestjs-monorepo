import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetMovieByIdQuery } from '@moviebuddy/movie';
import { JwtAuthGuard } from '@moviebuddy/auth';

@Controller('movies')
export class GetMovieByIdController {
  constructor(private readonly queryBus: QueryBus) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetMovieByIdQuery(id));
  }
}
