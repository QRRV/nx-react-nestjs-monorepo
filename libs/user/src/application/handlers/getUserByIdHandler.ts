import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByIdQuery } from '../queries/getUserByIdQuery';
import { UserQueryRepository } from '../../domain/ports/userQueryRepository';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(
    @Inject('UserQueryRepository')
    private readonly repo: UserQueryRepository
  ) {}

  async execute(query: GetUserByIdQuery) {
    const user = await this.repo.findById(query.id);
    if (!user) throw new NotFoundException('User not found');

    return user.toSafeObject();
  }
}
