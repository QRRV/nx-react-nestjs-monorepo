import { Body, Controller, Post } from '@nestjs/common';
import {
  CreateReviewCommand,
  CreateReviewDto,
} from '@moviebuddy/review';
import { CommandBus } from '@nestjs/cqrs';

@Controller('reviews')
export class CreateReviewController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async create(@Body() dto: CreateReviewDto) {
    const command = new CreateReviewCommand(
      dto.userId,
      dto.movieId,
      dto.rating,
      dto.comment
    );

    return this.commandBus.execute(command);
  }
}
