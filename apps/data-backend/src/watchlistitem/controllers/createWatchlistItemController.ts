import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  createWatchlistItemDto,
  CreateWatchlistItemCommand,
} from '@moviebuddy/watchlistitem';
import { JwtAuthGuard } from '@moviebuddy/auth';

@Controller('watchlist')
export class CreateWatchlistItemController {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: createWatchlistItemDto, @Req() req: any) {
    const userId = req.user.id;

    const command = new CreateWatchlistItemCommand(
      userId,
      dto.movieId,
      dto.priority
    );

    return this.commandBus.execute(command);
  }
}
