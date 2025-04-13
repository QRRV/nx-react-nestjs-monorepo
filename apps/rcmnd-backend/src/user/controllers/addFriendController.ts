import { Controller, Post, Req, UseGuards, Body } from '@nestjs/common';
import { JwtAuthGuard } from '@moviebuddy/auth';
import { CommandBus } from '@nestjs/cqrs';
import { AddFriendCommand } from '@moviebuddy/user-graph';

@Controller('users')
export class AddFriendController {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(JwtAuthGuard)
  @Post('friends')
  async addFriend(
    @Req() req: any,
    @Body() body: { friendId: string }
  ) {
    const userId = req.user.id;
    const command = new AddFriendCommand(userId, body.friendId);
    await this.commandBus.execute(command);
  }
}
