import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RegisterUserCommand } from '../commands/registerUserCommand';
import { AuthCommandRepository } from '../../domain/ports/authCommandRepository';
import { JwtService } from '../../infrastructure/services/jwt.service';
import { User } from '@moviebuddy/shared';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand> {
  constructor(
    @Inject('AuthCommandRepository')
    private readonly repo: AuthCommandRepository,
    private readonly jwtService: JwtService
  ) {}

  async execute(command: RegisterUserCommand): Promise<{ user: { id: string; username: string; email: string; bio: string, role: 'user' | 'admin' }; accessToken: string }> {
    const hashedPassword = await bcrypt.hash(command.password, 10);
    const user = new User(
      randomUUID(),
      command.username,
      command.email,
      hashedPassword,
      command.bio,
      command.role
    );

    const savedUser = await this.repo.create(user);

    const token = this.jwtService.sign({ sub: savedUser.id, email: savedUser.email, role: savedUser.role });

    return { user: savedUser.toSafeObject(), accessToken: token };
  }
}
