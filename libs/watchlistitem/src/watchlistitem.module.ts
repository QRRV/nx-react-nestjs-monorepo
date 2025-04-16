import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CqrsModule } from '@nestjs/cqrs'
import { WatchlistItemSchema } from './infrastructure/mongoose/schemas/watchlistItemSchema'
import { CreateWatchlistItemHandler } from './application/handlers/createWatchlistItemHandler'
import {
  MongooseWatchlistItemCommandRepository
} from './infrastructure/mongoose/repositories/mongooseWatchlistItemCommandRepository';
import { GetWatchlistByUserHandler } from './application/handlers/getWatchlistByUserHandler';
import {
  MongooseWatchlistItemQueryRepository
} from './infrastructure/mongoose/repositories/mongooseWatchlistItemQueryRepository';
import { UpdateWatchlistItemHandler } from './application/handlers/updateWatchlistItemHandler';
import { DeleteWatchlistItemHandler } from './application/handlers/deleteWatchlistItemHandler';
import {
  HttpWatchlistGraphCommandRepository
} from './infrastructure/neo4j/repositories/httpWatchlistGraphCommandRepository';

const commandHandlers = [
  CreateWatchlistItemHandler,
  UpdateWatchlistItemHandler,
  DeleteWatchlistItemHandler
]
const queryHandlers = [GetWatchlistByUserHandler]
@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: 'watchlistitems', schema: WatchlistItemSchema }])
  ],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    {
      provide: 'WatchlistItemCommandRepository',
      useClass: MongooseWatchlistItemCommandRepository
    },
    {
      provide: 'WatchlistItemQueryRepository',
      useClass: MongooseWatchlistItemQueryRepository
    },
    {
      provide: 'WatchlistGraphCommandRepository',
      useClass: HttpWatchlistGraphCommandRepository
    }
  ],
  exports: [
    ...commandHandlers,
    ...queryHandlers,
    MongooseModule
  ]
})
export class WatchlistitemModule {}
