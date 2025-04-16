import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, Roles, RolesGuard } from '@moviebuddy/auth';
import { CommandBus } from '@nestjs/cqrs';
import { CreateMovieDto, CreateMovieCommand } from '@moviebuddy/movie';

@Controller('movies')
export class CreateMovieController {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  async create(@Body() dto: CreateMovieDto, @Req() req: any) {
    const token = req.headers.authorization.split(' ')[1];
    const command = new CreateMovieCommand(dto, token);
    return this.commandBus.execute(command);
  }
}
