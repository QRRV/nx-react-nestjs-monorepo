import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetFriendsQuery } from '../queries/getFriendsQuery';
import { Inject } from '@nestjs/common';
import { FriendReadRepository } from '../../domain/ports/FriendReadRepository';

@QueryHandler(GetFriendsQuery)
export class GetFriendsHandler implements IQueryHandler<GetFriendsQuery> {
  constructor(
    @Inject('FriendReadRepository')
    private readonly repo: FriendReadRepository
  ) {}

  async execute(query: GetFriendsQuery): Promise<string[]> {
    return this.repo.getFriends(query.userId);
  }
}
