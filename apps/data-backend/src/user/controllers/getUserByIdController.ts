import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetUserByIdQuery } from '@moviebuddy/user';

@Controller('users')
export class GetUserByIdController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetUserByIdQuery(id));
  }
}
