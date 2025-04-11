import {
  Body,
  Controller,
  Param,
  Patch,
  ParseUUIDPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UpdateUserDto, UpdateUserCommand } from '@moviebuddy/user';
import { JwtAuthGuard } from '@moviebuddy/auth';

@Controller('users')
export class UpdateUserController {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateUserDto,
    @Req() req: any
  ) {
    const userId = req.user.id;

    const command = new UpdateUserCommand(id, userId, {
      username: dto.username,
      password: dto.password,
      bio: dto.bio,
    });

    return this.commandBus.execute(command);
  }
}
