import {
  Controller,
  Patch,
  Param,
  Body,
  ParseUUIDPipe,
  Req,
  UseGuards
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UpdateReviewDto, UpdateReviewCommand } from '@moviebuddy/review';
import { JwtAuthGuard } from '@moviebuddy/auth';

@Controller('reviews')
export class UpdateReviewController {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateReviewDto,
    @Req() req: any
  ) {
    const userId = req.user.id;
    const command = new UpdateReviewCommand(id, userId, dto.rating, dto.comment);
    return this.commandBus.execute(command);
  }
}
