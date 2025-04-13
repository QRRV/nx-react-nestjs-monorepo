import { Inject } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j';
import { FriendReadRepository } from '../../../domain/ports/FriendReadRepository';

export class Neo4jFriendReadRepository implements FriendReadRepository {
  constructor(@Inject(Neo4jService) private readonly neo4j: Neo4jService) {}

  async getFriends(userId: string): Promise<string[]> {
    const result = await this.neo4j.read(
      `
      MATCH (:User {id: $userId})-[:FRIEND]->(friend:User)
      RETURN friend.id AS friendId
      `,
      { userId }
    );
    return result.records.map((row) => row.get('friendId'));
  }
}
