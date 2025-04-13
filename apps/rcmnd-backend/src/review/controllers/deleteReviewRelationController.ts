import { Controller, Delete, Param, UseGuards, Req } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '@moviebuddy/auth';
import { DeleteReviewRelationCommand } from '@moviebuddy/review-graph';

@Controller('review/relations')
export class DeleteReviewRelationController {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(JwtAuthGuard)
  @Delete(':reviewId')
  async delete(
    @Param('reviewId') reviewId: string,
    @Req() req: any
  ) {
    const userId = req.user.id;
    const command = new DeleteReviewRelationCommand(userId, reviewId);
    await this.commandBus.execute(command);
  }
}
