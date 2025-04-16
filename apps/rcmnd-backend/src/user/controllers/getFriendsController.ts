import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@moviebuddy/auth';
import { QueryBus } from '@nestjs/cqrs';
import { GetFriendsQuery } from '@moviebuddy/user-graph';

@Controller('users')
export class GetFriendsController {
  constructor(private readonly queryBus: QueryBus) {}

  @UseGuards(JwtAuthGuard)
  @Get(':userId/friends')
  async getFriends(@Param('userId') userId: string) {
    return this.queryBus.execute(new GetFriendsQuery(userId));
  }
}
