import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs'
import { GetWatchlistByUserQuery } from '@moviebuddy/watchlistitem'
import { JwtAuthGuard } from '@moviebuddy/auth';

@Controller('users')
export class GetWatchlistByUserController {
  constructor(private readonly queryBus: QueryBus) {}

  @UseGuards(JwtAuthGuard)
  @Get(':userId/watchlist')
  async getByUser(@Param('userId') userId: string) {
    return this.queryBus.execute(new GetWatchlistByUserQuery(userId))
  }
}

