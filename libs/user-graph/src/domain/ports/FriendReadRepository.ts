export interface FriendReadRepository {
  getFriends(userId: string): Promise<string[]>;
}
