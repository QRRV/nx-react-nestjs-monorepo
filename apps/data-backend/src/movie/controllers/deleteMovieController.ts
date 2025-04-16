import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { DeleteMovieCommand } from '@moviebuddy/movie';
import { JwtAuthGuard, Roles, RolesGuard } from '@moviebuddy/auth';

@Controller('movies')
export class DeleteMovieController {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteMovieCommand(id));
  }
}
