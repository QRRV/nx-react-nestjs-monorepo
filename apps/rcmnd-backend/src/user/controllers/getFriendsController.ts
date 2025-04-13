import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@moviebuddy/auth';
import { QueryBus } from '@nestjs/cqrs';
import { GetFriendsQuery } from '@moviebuddy/user-graph';

@Controller('users')
export class GetFriendsController {
  constructor(private readonly queryBus: QueryBus) {}

  @UseGuards(JwtAuthGuard)
  @Get('friends')
  async getFriends(@Req() req: any) {
    const userId = req.user.id;
    return this.queryBus.execute(new GetFriendsQuery(userId));
  }
}
