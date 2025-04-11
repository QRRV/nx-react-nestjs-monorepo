import { Controller, Patch, Param, Body, ParseUUIDPipe } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { updateWatchlistItemDto, UpdateWatchlistItemCommand } from '@moviebuddy/watchlistitem'

@Controller('watchlist')
export class UpdateWatchlistItemController {
  constructor(private readonly commandBus: CommandBus) {}

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: updateWatchlistItemDto
  ) {
    const command = new UpdateWatchlistItemCommand(
      id,
      dto.userId,
      dto.watched,
      dto.priority
    )
    return this.commandBus.execute(command)
  }
}
