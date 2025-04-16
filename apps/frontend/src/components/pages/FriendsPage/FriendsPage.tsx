import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiRequest } from '../../../utils/apiClient';
import Text from '../../atoms/text/Text';
import { FontSize } from '../../../enums/FontSize';
import { FontWeight } from '../../../enums/FontWeight';
import style from './FriendsPage.module.css';
import { User } from '../../../entities/User';

const FriendsPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const [friends, setFriends] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token || !userId) {
          navigate('/register');
          return;
        }

        const friendIdsRes = await apiRequest(`/users/${userId}/friends`, {
          method: 'GET',
          authToken: token,
        }, true);
        const friendIds: string[] = friendIdsRes.data;

        const friendDetails: User[] = [];

        for (const id of friendIds) {
          try {
            const friendRes = await apiRequest(`/users/${id}`, {
              method: 'GET',
              authToken: token,
            });
            friendDetails.push(friendRes.data);
          } catch (err: any) {
            continue;
          }
        }

        setFriends(friendDetails);
      } catch (err) {
        console.error('Fetching friends failed:', err);
        setError('Failed to load friends.');
      }
    };

    fetchFriends();
  }, [userId, navigate]);

  const handleCardClick = (id: string) => {
    navigate(`/profile/${id}`);
  };

  return (
    <div className={style.wrapper}>
      <Text fontSize={FontSize.XXLARGE} fontWeight={FontWeight.ExtraBold}>
        Friends
      </Text>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className={style.grid}>
        {friends.map((friend) => (
          <div
            key={friend.id}
            className={style.card}
            onClick={() => handleCardClick(friend.id)}
          >
            <Text fontSize={FontSize.LARGE} fontWeight={FontWeight.Bold}>
              {friend.username}
            </Text>
            <Text fontSize={FontSize.SMALL}>{friend.email}</Text>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsPage;
