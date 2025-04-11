import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { QueryBus } from '@nestjs/cqrs';
import { LoginUserQuery } from '../../application/queries/loginUserQuery';
import { User } from '@moviebuddy/user';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly queryBus: QueryBus) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.queryBus.execute(
      new LoginUserQuery(email, password),
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
