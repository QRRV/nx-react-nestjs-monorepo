import { Controller, Delete, Body, UseGuards, Req } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '@moviebuddy/auth';
import { DeleteReviewRelationCommand } from '@moviebuddy/review-graph';

@Controller('review/relations')
export class DeleteReviewRelationController {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(
    @Body() body: { movieId: string },
    @Req() req: any
  ) {
    const userId = req.user.id;
    const command = new DeleteReviewRelationCommand(userId, body.movieId);
    await this.commandBus.execute(command);
  }
}
