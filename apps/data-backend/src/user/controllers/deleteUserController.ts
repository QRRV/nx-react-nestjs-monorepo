import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { DeleteUserCommand } from '@moviebuddy/user';
import { JwtAuthGuard } from '@moviebuddy/auth';

@Controller('users')
export class DeleteUserController {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Req() req: any
  ) {
    const userId = req.user.id;
    const command = new DeleteUserCommand(id, userId);
    return this.commandBus.execute(command);
  }
}
