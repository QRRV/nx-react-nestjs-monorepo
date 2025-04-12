import {
  Controller,
  Patch,
  Param,
  Body,
  ParseUUIDPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  updateWatchlistItemDto,
  UpdateWatchlistItemCommand,
} from '@moviebuddy/watchlistitem';
import { JwtAuthGuard } from '@moviebuddy/auth';

@Controller('watchlist')
export class UpdateWatchlistItemController {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: updateWatchlistItemDto,
    @Req() req: any
  ) {
    const userId = req.user.id;

    const command = new UpdateWatchlistItemCommand(
      id,
      userId,
      dto.watched,
      dto.priority
    );

    return this.commandBus.execute(command);
  }
}
