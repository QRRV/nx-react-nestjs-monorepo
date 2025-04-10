import { Controller, Patch, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UpdateReviewDto, UpdateReviewCommand } from '@moviebuddy/review';

@Controller('reviews')
export class UpdateReviewController {
  constructor(private readonly commandBus: CommandBus) {}

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateReviewDto
  ) {
    const command = new UpdateReviewCommand(
      id,
      dto.userId,
      dto.rating,
      dto.comment
    );
    return this.commandBus.execute(command);
  }
}
