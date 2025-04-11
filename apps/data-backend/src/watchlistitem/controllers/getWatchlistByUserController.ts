import { Controller, Get, Param } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'
import { GetWatchlistByUserQuery } from '@moviebuddy/watchlistitem'

@Controller('users')
export class GetWatchlistByUserController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(':userId/watchlist')
  async getByUser(@Param('userId') userId: string) {
    return this.queryBus.execute(new GetWatchlistByUserQuery(userId))
  }
}

