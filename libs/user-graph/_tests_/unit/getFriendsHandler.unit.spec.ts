import { FriendReadRepository } from '../../src/domain/ports/FriendReadRepository';
import { GetFriendsHandler, GetFriendsQuery } from '../../src';

describe('GetFriendsHandler', () => {
  it('should return list of friend IDs from the repository', async () => {
    const repo: FriendReadRepository = {
      getFriends: jest.fn().mockResolvedValue(['user-2', 'user-3']),
    };

    const handler = new GetFriendsHandler(repo);
    const query = new GetFriendsQuery('user-1');

    const result = await handler.execute(query);

    expect(repo.getFriends).toHaveBeenCalledWith('user-1');
    expect(result).toEqual(['user-2', 'user-3']);
  });
});
