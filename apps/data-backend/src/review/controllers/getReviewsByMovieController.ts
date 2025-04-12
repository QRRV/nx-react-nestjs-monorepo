import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetReviewsByMovieQuery } from '@moviebuddy/review';
import { JwtAuthGuard } from '@moviebuddy/auth';

@Controller('movies/:movieId/reviews')
export class GetReviewsByMovieController {
  constructor(private readonly queryBus: QueryBus) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getByMovie(@Param('movieId') movieId: string) {
    return this.queryBus.execute(new GetReviewsByMovieQuery(movieId));
  }
}
