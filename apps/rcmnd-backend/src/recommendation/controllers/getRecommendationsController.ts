import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '@moviebuddy/auth';
import { QueryBus } from '@nestjs/cqrs';
import {
  GetRecommendationsDto,
  GetRecommendationsQuery,
} from '@moviebuddy/recommendation-graph';

@Controller('users')
export class GetRecommendationsController {
  constructor(private readonly queryBus: QueryBus) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  @Get(':id/recommendations')
  async getRecommendations(
    @Param('id') userId: string,
    @Query() query: GetRecommendationsDto
  ) {
    return this.queryBus.execute(
      new GetRecommendationsQuery(
        userId,
        query.minRating,
        query.genre,
        query.limit
      )
    );
  }
}
