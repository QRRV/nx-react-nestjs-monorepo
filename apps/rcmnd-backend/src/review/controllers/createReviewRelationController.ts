import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateReviewRelationCommand } from '@moviebuddy/review-graph';
import { JwtAuthGuard } from '@moviebuddy/auth';

@Controller('review/relations')
export class CreateReviewRelationController {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() body: { movieId: string; rating: number },
    @Req() req: any
  ) {
    const userId = req.user.id;

    const command = new CreateReviewRelationCommand(userId, body.movieId, body.rating);
    await this.commandBus.execute(command);
  }
}
