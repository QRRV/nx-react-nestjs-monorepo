import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetReviewsByUserQuery } from '@moviebuddy/review';

@Controller('users')
export class GetReviewsByUserController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(':userId/reviews')
  async getByUser(@Param('userId') userId: string) {
    return this.queryBus.execute(new GetReviewsByUserQuery(userId));
  }
}
