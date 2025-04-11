import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { LoginUserQuery } from '../queries/loginUserQuery';
import * as bcrypt from 'bcrypt';
import { JwtService } from '../../infrastructure/services/jwt.service';
import { AuthQueryRepository } from '../../domain/ports/authQueryRepository';

@QueryHandler(LoginUserQuery)
export class LoginUserHandler implements IQueryHandler<LoginUserQuery> {
  constructor(
    @Inject('AuthQueryRepository')
    private readonly repo: AuthQueryRepository,
    private readonly jwtService: JwtService
  ) {}

  async execute(query: LoginUserQuery): Promise<{ accessToken: string }> {
    const user = await this.repo.findByEmail(query.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(query.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return { accessToken: token };
  }
}
