import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { JwtAuthGuard, Roles, RolesGuard } from '@moviebuddy/auth';
import { CreateMovieGraphCommand } from '@moviebuddy/movie-graph';

@Controller('movies/relations')
export class CreateMovieGraphController {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  async create(@Body() body: { id: string; title: string; genres: string[] }) {
    return this.commandBus.execute(
      new CreateMovieGraphCommand(body.id, body.title, body.genres)
    );
  }
}
