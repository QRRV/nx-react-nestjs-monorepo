import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '@moviebuddy/user';
import { AuthQueryRepository } from '../../domain/ports/authQueryRepository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AuthQueryRepository')
    private readonly userRepo: AuthQueryRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env['JWT_SECRET'] || 'your_secret_key',
    });
  }

  async validate(payload: { sub: string; email: string }): Promise<User> {
    const user = await this.userRepo.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return user;
  }
}
