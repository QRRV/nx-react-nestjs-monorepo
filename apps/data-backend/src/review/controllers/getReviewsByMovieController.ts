import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetReviewsByMovieQuery } from '@moviebuddy/review';

@Controller('movies/:movieId/reviews')
export class GetReviewsByMovieController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async getByMovie(@Param('movieId') movieId: string) {
    return this.queryBus.execute(new GetReviewsByMovieQuery(movieId));
  }
}
