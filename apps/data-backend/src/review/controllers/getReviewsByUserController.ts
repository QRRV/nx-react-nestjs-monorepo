import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetReviewsByUserQuery } from '@moviebuddy/review';
import { JwtAuthGuard } from '@moviebuddy/auth';

@Controller('users')
export class GetReviewsByUserController {
  constructor(private readonly queryBus: QueryBus) {}

  @UseGuards(JwtAuthGuard)
  @Get(':userId/reviews')
  async getByUser(@Param('userId') userId: string) {
    return this.queryBus.execute(new GetReviewsByUserQuery(userId));
  }
}
