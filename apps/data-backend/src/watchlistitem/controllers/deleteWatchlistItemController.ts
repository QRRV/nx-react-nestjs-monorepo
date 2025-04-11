import { Controller, Delete, Param, Body } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { DeleteWatchlistItemCommand } from '@moviebuddy/watchlistitem'

@Controller('watchlist')
export class DeleteWatchlistItemController {
  constructor(private readonly commandBus: CommandBus) {}

  @Delete(':id')
  async delete(@Param('id') id: string, @Body() body: { userId: string }) {
    const command = new DeleteWatchlistItemCommand(id, body.userId)
    return this.commandBus.execute(command)
  }
}
