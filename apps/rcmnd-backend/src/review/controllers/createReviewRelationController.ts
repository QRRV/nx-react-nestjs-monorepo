import { Body, Controller, Post, UseGuards, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateReviewRelationCommand } from '@moviebuddy/review-graph';
import { JwtAuthGuard } from '@moviebuddy/auth';
import { CreateReviewRelationDto } from '@moviebuddy/review-graph';

@Controller('review/relations')
export class CreateReviewRelationController {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  async create(
    @Body() body: CreateReviewRelationDto,
    @Req() req: any
  ) {
    const userId = req.user.id;
    const command = new CreateReviewRelationCommand(userId, body.movieId, body.rating, body.reviewId);
    await this.commandBus.execute(command);
  }
}
