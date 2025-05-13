import { FriendshipRepository } from '../../../../domain/ports/friendshipRepository';
import { Inject } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j';

export class Neo4jFriendshipRepository implements FriendshipRepository {
  constructor(@Inject(Neo4jService) private readonly neo4j: Neo4jService) {}

  async addFriend(userId: string, friendId: string): Promise<void> {
    await this.neo4j.write(
      `
      MERGE (a:User {id: $userId})
      MERGE (b:User {id: $friendId})
      MERGE (a)-[:FRIEND]->(b)
      MERGE (b)-[:FRIEND]->(a)
      `,
      { userId, friendId }
    );
  }

  async removeFriend(userId: string, friendId: string): Promise<void> {
    await this.neo4j.write(
      `
      MATCH (a:User {id: $userId})-[r1:FRIEND]->(b:User {id: $friendId})
      MATCH (b)-[r2:FRIEND]->(a)
      DELETE r1, r2
      `,
      { userId, friendId }
    );
  }
}
