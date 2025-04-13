import { Body, Controller, Post, UseGuards, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateMovieListItemRelationCommand } from '@moviebuddy/movielistitem-graph';
import { JwtAuthGuard } from '@moviebuddy/auth';
import { CreateMovieListItemRelationDto } from '@moviebuddy/movielistitem-graph';

@Controller('movielistitem/relations')
export class CreateMovieListItemRelationController {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  async create(
    @Body() body: CreateMovieListItemRelationDto,
    @Req() req: any
  ) {
    const userId = req.user.id;
    const command = new CreateMovieListItemRelationCommand(userId, body.movieId, body.itemId);
    await this.commandBus.execute(command);
  }
}
