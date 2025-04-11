import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterUserCommand, RegisterUserDto } from '@moviebuddy/auth';

@Controller('auth')
export class RegisterController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('register')
  async register(@Body() dto: RegisterUserDto) {
    const command = new RegisterUserCommand(
      dto.username,
      dto.email,
      dto.password,
      dto.bio
    );

    return this.commandBus.execute(command);
  }
}
