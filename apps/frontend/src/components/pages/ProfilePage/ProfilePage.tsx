import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiRequest } from '../../../utils/apiClient';
import { User } from '../../../entities/User';
import Text from '../../atoms/text/Text';
import style from './ProfilePage.module.css';
import { FontSize } from '../../../enums/FontSize';
import { FontWeight } from '../../../enums/FontWeight';
import { Color } from '../../../enums/Color';
import Button from '../../atoms/button/Button';
import { getUserId } from '../../../utils/auth';
import { RoutePath } from '../../../routes';
import { Review, ReviewWithMovieTitle } from '../../../entities/Review';
import ReviewList from '../../organisms/reviewList/ReviewList';

const ProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const [reviews, setReviews] = useState<ReviewWithMovieTitle[]>([]);
  const [friends, setFriends] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const currentUserId = getUserId();

  const isOwnProfile = currentUserId === id;
  const isFriend = friends.includes(id!);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token || !id) {
          navigate(RoutePath.REGISTER);
          return;
        }

        const [userRes, reviewsRes, friendsRes] = await Promise.all([
          apiRequest(`/users/${id}`, { method: 'GET', authToken: token }),
          apiRequest(`/users/${id}/reviews`, { method: 'GET', authToken: token }),
          apiRequest('/users/friends', { method: 'GET', authToken: token }, true),
        ]);

        setUser(userRes.data);

        const rawReviews: Review[] = (reviewsRes.data || []).map((r: any) => ({
          ...r,
          reviewDate: new Date(r.reviewDate),
        }));

        const uniqueMovieIds = [...new Set(rawReviews.map(r => r.movieId))];
        const movieMap: Record<string, string> = {};

        await Promise.all(
          uniqueMovieIds.map(async (movieId) => {
            try {
              const movieRes = await apiRequest(`/movies/${movieId}`, {
                method: 'GET',
                authToken: token,
              });
              movieMap[movieId] = movieRes.data.title;
            } catch (err) {
              console.warn(`Could not fetch movie ${movieId}:`, err);
              movieMap[movieId] = 'Unknown Title';
            }
          })
        );

        const enrichedReviews: ReviewWithMovieTitle[] = rawReviews.map((review) => ({
          ...review,
          movieTitle: movieMap[review.movieId],
        }));

        setReviews(enrichedReviews);
        setFriends(friendsRes.data || []);

      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
    };

    fetchData();
  }, [navigate, id]);



  const handleAddFriend = async () => {
    if (!id || currentUserId === id) return;

    try {
      const token = localStorage.getItem('token');
      await apiRequest('/users/friends', {
        method: 'POST',
        authToken: token || '',
        body: { friendId: id },
      }, true);

      setFriends((prev) => [...prev, id]);
    } catch (err) {
      console.error('Failed to add friend:', err);
    }
  };

  const handleRemoveFriend = async () => {
    try {
      const token = localStorage.getItem('token');
      await apiRequest(`/users/friends/${id}`, {
        method: 'DELETE',
        authToken: token || '',
      }, true);

      setFriends((prev) => prev.filter((f) => f !== id));
    } catch (err) {
      console.error('Failed to remove friend:', err);
    }
  };

  const goToWatchlist = () => {
    navigate(`/users/${id}/watchlist`);
  };

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!user) return <div>Loading...</div>;

  return (
    <div className={style.wrapper}>
      <div className={style.profileCard}>
        <Text fontSize={FontSize.XXLARGE} fontWeight={FontWeight.ExtraBold}>
          {user.username}
        </Text>
        <Text fontSize={FontSize.MEDIUM} fontColor={Color.GRAY}>
          {user.email}
        </Text>
        <Text fontSize={FontSize.SMALL} fontColor={Color.BLACK}>
          {user.bio}
        </Text>
        <Text fontSize={FontSize.SMALL} fontColor={Color.PRIMARY}>
          Role: {user.role}
        </Text>

        {isOwnProfile && (
          <div className={style.buttonGroup}>
            <Button onClick={() => navigate(`/profile/${user.id}/edit`)}>
              Edit Profile
            </Button>
            <Button variant="danger" onClick={async () => {
              const confirmed = window.confirm('Delete your account? This cannot be undone.');
              if (!confirmed) return;

              try {
                const token = localStorage.getItem('token');
                await apiRequest(`/users/${id}`, {
                  method: 'DELETE',
                  authToken: token || '',
                });
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate(RoutePath.REGISTER);
              } catch (err) {
                console.error('Failed to delete user:', err);
                alert('Deletion failed. Try again.');
              }
            }}>
              Delete Account
            </Button>
          </div>
        )}

        {!isOwnProfile && (
          <div className={style.buttonGroup}>
            <Button onClick={handleAddFriend} disabled={isFriend}>
              {isFriend ? 'Already Friends' : 'Add Friend'}
            </Button>
            {isFriend && (
              <Button variant="danger" onClick={handleRemoveFriend}>
                Remove Friend
              </Button>
            )}
          </div>
        )}

        <div className={style.buttonGroup}>
          <Button onClick={goToWatchlist}>View Watchlist</Button>
        </div>
      </div>

      <div className={style.section}>
        <Text fontSize={FontSize.XLARGE} fontWeight={FontWeight.Bold}>
          Reviews
        </Text>
        <ReviewList reviews={reviews} />
      </div>
    </div>
  );
};

export default ProfilePage;
