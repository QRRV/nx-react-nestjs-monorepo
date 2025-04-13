export interface FriendshipRepository {
  addFriend(userId: string, friendId: string): Promise<void>;
  removeFriend(userId: string, friendId: string): Promise<void>;
}
