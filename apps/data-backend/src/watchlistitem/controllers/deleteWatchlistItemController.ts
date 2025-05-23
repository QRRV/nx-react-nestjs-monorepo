import {
  Controller,
  Delete,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { DeleteWatchlistItemCommand } from '@moviebuddy/watchlistitem';
import { JwtAuthGuard } from '@moviebuddy/auth';

@Controller('watchlist')
export class DeleteWatchlistItemController {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.id;
    const token = req.headers.authorization.split(' ')[1];

    const command = new DeleteWatchlistItemCommand(id, userId, token);
    return this.commandBus.execute(command);
  }
}
