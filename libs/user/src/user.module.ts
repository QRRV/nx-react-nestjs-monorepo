import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { UserSchema } from './infrastructure/mongoose/schemas/userSchema';
import { MongooseUserCommandRepository } from './infrastructure/mongoose/repositories/mongooseUserCommandRepository';
import { GetUserByIdHandler } from './application/handlers/getUserByIdHandler';
import { MongooseUserQueryRepository } from './infrastructure/mongoose/repositories/mongooseUserQueryRepository';
import { UpdateUserHandler } from './application/handlers/updateUserHandler';
import { DeleteUserHandler } from './application/handlers/deleteUserHandler';

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
    MongooseModule.forFeature([
      { name: 'users', schema: UserSchema }
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
