import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserDto } from '@moviebuddy/user';
import { CreateUserCommand } from '@moviebuddy/user';

@Controller('users')
export class CreateUserController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    const command = new CreateUserCommand(
      dto.username,
      dto.email,
      dto.password,
      dto.bio
    );
    return this.commandBus.execute(command);
  }
}
