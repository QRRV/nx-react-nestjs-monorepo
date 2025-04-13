import { Controller, Delete, Param, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@moviebuddy/auth';
import { CommandBus } from '@nestjs/cqrs';
import { RemoveFriendCommand } from '@moviebuddy/user-graph';

@Controller('users')
export class RemoveFriendController {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(JwtAuthGuard)
  @Delete('friends/:friendId')
  async removeFriend(
    @Param('friendId') friendId: string,
    @Req() req: any
  ) {
    const userId = req.user.id;
    const command = new RemoveFriendCommand(userId, friendId);
    await this.commandBus.execute(command);
  }
}
