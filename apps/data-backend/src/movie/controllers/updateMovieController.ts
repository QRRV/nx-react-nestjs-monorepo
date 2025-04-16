import { Body, Controller, Patch, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, RolesGuard, Roles } from '@moviebuddy/auth';
import { CommandBus } from '@nestjs/cqrs';
import { UpdateMovieCommand, UpdateMovieDto } from '@moviebuddy/movie';

@Controller('movies')
export class UpdateMovieController {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: UpdateMovieDto) {
    const command = new UpdateMovieCommand(id, dto);
    return this.commandBus.execute(command);
  }
}
