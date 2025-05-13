import { Module } from '@nestjs/common';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { User } from './entities/user';

@Module({
  providers: [TransformInterceptor, User],
  exports: [TransformInterceptor, User],
})
export class SharedModule {}
