import { Body, Controller, Post } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { createWatchlistItemDto, CreateWatchlistItemCommand } from '@moviebuddy/watchlistitem'

@Controller('watchlist')
export class CreateWatchlistItemController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async create(@Body() dto: createWatchlistItemDto) {
    const command = new CreateWatchlistItemCommand(dto.userId, dto.movieId, dto.priority)
    return this.commandBus.execute(command)
  }
}
