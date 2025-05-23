import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { LocalStrategy } from './infrastructure/strategies/local.strategy';
import { JwtService } from './infrastructure/services/jwt.service';
import { RegisterUserHandler } from './application/handlers/registerUserHandler';
import { LoginUserHandler } from './application/handlers/loginUserHandler';
import { MongooseAuthQueryRepository } from './infrastructure/adapters/mongoose/repositories/mongooseAuthQueryRepository';
import { MongooseAuthCommandRepository } from './infrastructure/adapters/mongoose/repositories/mongooseAuthCommandRepository';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthUserSchema } from './infrastructure/adapters/mongoose/schemas/authUserSchema';
import { SharedModule } from '@moviebuddy/shared';

@Module({
  imports: [
    PassportModule,
    CqrsModule,
    SharedModule,
    JwtModule.register({
      secret: process.env['JWT_SECRET'] || 'your_secret_key',
      signOptions: { expiresIn: '7d' },
    }),
    MongooseModule.forFeature([{ name: 'users', schema: AuthUserSchema }]),
  ],
  providers: [
    JwtStrategy,
    LocalStrategy,
    JwtService,
    RegisterUserHandler,
    LoginUserHandler,
    {
      provide: 'AuthCommandRepository',
      useClass: MongooseAuthCommandRepository,
    },
    {
      provide: 'AuthQueryRepository',
      useClass: MongooseAuthQueryRepository,
    },
  ],
  exports: [
    JwtService
  ],
})
export class AuthModule {}
