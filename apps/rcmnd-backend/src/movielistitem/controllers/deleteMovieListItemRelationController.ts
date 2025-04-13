import { Controller, Delete, Param, UseGuards, Req } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '@moviebuddy/auth';
import { DeleteMovieListItemRelationCommand } from '@moviebuddy/movielistitem-graph';

@Controller('movielistitem/relations')
export class DeleteMovieListItemRelationController {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(JwtAuthGuard)
  @Delete(':itemId')
  async delete(
    @Param('itemId') itemId: string,
    @Req() req: any
  ) {
    const userId = req.user.id;
    const command = new DeleteMovieListItemRelationCommand(userId, itemId);
    await this.commandBus.execute(command);
  }
}
