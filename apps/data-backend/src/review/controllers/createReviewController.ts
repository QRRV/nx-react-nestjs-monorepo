import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { CreateReviewCommand, CreateReviewDto } from '@moviebuddy/review';
import { CommandBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '@moviebuddy/auth';

@Controller('reviews')
export class CreateReviewController {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateReviewDto, @Req() req: any) {
    const userId = req.user.id;
    const token = req.headers.authorization.split(' ')[1];
    const command = new CreateReviewCommand(
      userId,
      dto.movieId,
      dto.rating,
      token,
      dto.comment
    );

    return this.commandBus.execute(command);
  }
}
