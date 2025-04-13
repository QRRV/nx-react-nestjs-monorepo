import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AddFriendHandler } from './application/handlers/addFriendHandler';
import { RemoveFriendHandler } from './application/handlers/removeFriendHandler';
import { GetFriendsHandler } from './application/handlers/getFriendsHandler';

import { Neo4jFriendshipRepository } from './infrastructure/neo4j/repositories/neo4jFriendshipRepository';
import { Neo4jFriendReadRepository } from './infrastructure/neo4j/repositories/neo4jFriendReadRepository';

const commandHandlers = [AddFriendHandler, RemoveFriendHandler];
const queryHandlers = [GetFriendsHandler];

@Module({
  imports: [CqrsModule],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    {
      provide: 'FriendshipRepository',
      useClass: Neo4jFriendshipRepository,
    },
    {
      provide: 'FriendReadRepository',
      useClass: Neo4jFriendReadRepository,
    },
  ],
  exports: [...commandHandlers, ...queryHandlers],
})
export class UserGraphModule {}
