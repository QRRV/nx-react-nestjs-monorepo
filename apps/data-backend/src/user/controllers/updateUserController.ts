import { Body, Controller, Param, Put, ParseUUIDPipe, Patch } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UpdateUserDto, UpdateUserCommand } from '@moviebuddy/user';

@Controller('users')
export class UpdateUserController {
  constructor(private readonly commandBus: CommandBus) {}

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateUserDto
  ) {
    const command = new UpdateUserCommand(
      id,
      dto.userId,
      {
        username: dto.username,
        password: dto.password,
        bio: dto.bio
      }
    );

    return this.commandBus.execute(command);
  }
}
