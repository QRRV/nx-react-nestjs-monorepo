import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { UserSchema } from './infrastructure/adapters/mongoose/schemas/userSchema';
import { MongooseUserCommandRepository } from './infrastructure/adapters/mongoose/repositories/mongooseUserCommandRepository';
import { GetUserByIdHandler } from './application/handlers/getUserByIdHandler';
import { MongooseUserQueryRepository } from './infrastructure/adapters/mongoose/repositories/mongooseUserQueryRepository';
import { UpdateUserHandler } from './application/handlers/updateUserHandler';
import { DeleteUserHandler } from './application/handlers/deleteUserHandler';
import { WatchlistitemModule } from '@moviebuddy/watchlistitem';
import { ReviewModule } from '@moviebuddy/review';
import { SharedModule } from '@moviebuddy/shared';

const commandHandlers = [
  UpdateUserHandler,
  DeleteUserHandler
];

const queryHandlers = [
  GetUserByIdHandler,
];

@Module({
  imports: [
    CqrsModule,
    WatchlistitemModule,
    ReviewModule,
    SharedModule,
    MongooseModule.forFeature([
      { name: 'users', schema: UserSchema },
    ])
  ],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    {
      provide: 'UserQueryRepository',
      useClass: MongooseUserQueryRepository
    },
    {
      provide: 'UserCommandRepository',
      useClass: MongooseUserCommandRepository
    }
  ],
  exports: [
    ...commandHandlers,
    ...queryHandlers,
  ]
})
export class UserModule {}
