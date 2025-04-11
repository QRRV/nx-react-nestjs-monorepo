import { Body, Controller, Post } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { LoginUserQuery, LoginUserDto } from '@moviebuddy/auth';

@Controller('auth')
export class LoginController {
  constructor(private readonly queryBus: QueryBus) {}

  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    const query = new LoginUserQuery(dto.email, dto.password);
    return this.queryBus.execute(query);
  }
}
