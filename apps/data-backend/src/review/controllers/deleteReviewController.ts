import { Controller, Delete, Param, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { DeleteReviewCommand } from '@moviebuddy/review';

@Controller('reviews')
export class DeleteReviewController {
  constructor(private readonly commandBus: CommandBus) {}

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Body('userId') userId: string
  ) {
    return this.commandBus.execute(new DeleteReviewCommand(id, userId));
  }
}
