import {
  Controller,
  Delete,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { DeleteReviewCommand } from '@moviebuddy/review';
import { JwtAuthGuard } from '@moviebuddy/auth';

@Controller('reviews')
export class DeleteReviewController {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.id;
    return this.commandBus.execute(new DeleteReviewCommand(id, userId));
  }
}
