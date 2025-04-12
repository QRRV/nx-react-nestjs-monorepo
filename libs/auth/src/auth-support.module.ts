import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtPayloadStrategy } from './infrastructure/strategies/jwtPayload.strategy';
import { JwtAuthGuard } from './interfaces/guards/jwtAuthGuard';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env['JWT_SECRET'] || 'test',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [JwtPayloadStrategy, JwtAuthGuard],
  exports: [JwtAuthGuard],
})
export class AuthSupportModule {}
