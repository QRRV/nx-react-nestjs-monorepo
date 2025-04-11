import { Body, Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { DeleteUserCommand } from '@moviebuddy/user';

@Controller('users')
export class DeleteUserController {
  constructor(private readonly commandBus: CommandBus) {}

  @Delete(':id')
  async delete(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body('userId') userId: string
  ) {
    const command = new DeleteUserCommand(id, userId);
    return this.commandBus.execute(command);
  }
}
