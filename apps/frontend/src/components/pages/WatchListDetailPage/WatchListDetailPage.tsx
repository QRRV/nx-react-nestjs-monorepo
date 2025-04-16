import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiRequest } from '../../../utils/apiClient';
import { WatchListItem } from '../../../entities/WatchListItem';
import { RoutePath } from '../../../routes';
import { getUserId } from '../../../utils/auth';
import WatchList from '../../organisms/WatchList/WatchList';
import Text from '../../atoms/text/Text';
import { FontSize } from '../../../enums/FontSize';
import { FontWeight } from '../../../enums/FontWeight';
import { User } from '../../../entities/User';
import Button from '../../atoms/button/Button';

const WatchListDetailPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [items, setItems] = useState<WatchListItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User>();

  const canEdit = getUserId() === userId;

  useEffect(() => {
    const fetchWatchList = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token || !userId) {
          navigate(RoutePath.REGISTER);
          return;
        }

        const response = await apiRequest(`/users/${userId}/watchlist`, {
          method: 'GET',
          authToken: token,
        });

        const rawItems: WatchListItem[] = response.data;

        const uniqueMovieIds = [
          ...new Set(rawItems.map((item) => item.movieId)),
        ];
        const movieTitleMap: Record<string, string> = {};

        for (const movieId of uniqueMovieIds) {
          try {
            const movieRes = await apiRequest(`/movies/${movieId}`, {
              method: 'GET',
              authToken: token,
            });
            movieTitleMap[movieId] = movieRes.data.title;
          } catch {
            movieTitleMap[movieId] = 'Unknown Title';
          }
        }

        const enriched = rawItems.map((item) => ({
          ...item,
          movieTitle: movieTitleMap[item.movieId],
        }));

        setItems(enriched);
      } catch (err) {
        console.error('Failed to fetch watchlist:', err);
        setError('Failed to load watchlist. Please try again.');
      }
    };

    fetchWatchList();
  }, [navigate, userId]);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token || !userId) {
          navigate(RoutePath.REGISTER);
          return;
        }

        const response = await apiRequest(`/users/${userId}`, {
          method: 'GET',
          authToken: token,
        });

        setUser(response.data)
      } catch (err) {
        console.error('Failed to fetch user:', err);
        setError('Failed to load user data. Please try again.');
      }
    }
    fetchUser();
  }, [navigate, userId]);

  const handleEditClick = (itemId: string) => {
    navigate(`/users/${userId}/watchlist/${itemId}/edit`);
  };

  const handleRemoveClick = async (itemId: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to remove this item?'
    );
    if (!confirmed || !userId) return;

    try {
      const token = localStorage.getItem('token');
      await apiRequest(`/watchlist/${itemId}`, {
        method: 'DELETE',
        authToken: token || '',
      });

      setItems((prev) => prev.filter((item) => item.id !== itemId));
    } catch (err) {
      console.error('Failed to delete watchlist item:', err);
      setError('Could not delete item. Please try again.');
    }
  };
  const handleGoToMovie = (movieId: string) => {
    navigate(`/movie/${movieId}`);
  };

  const handleOnCardClick = (itemId: string) => {
    navigate(`/users/${userId}/watchlist/${itemId}`);
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      <Text fontSize={FontSize.XXLARGE} fontWeight={FontWeight.Bold}>
        {user?.username}'s Watch List
      </Text>

      {canEdit && (
        <div style={{ margin: '1rem 0' }}>
          <Button onClick={() => navigate(`/users/${userId}/watchlist/create`)}>
            Create a New Item
          </Button>
        </div>
      )}

      <WatchList
        items={items}
        onEditClick={canEdit ? handleEditClick : undefined}
        onRemoveClick={canEdit ? handleRemoveClick : undefined}
        onGoToMovieClick={handleGoToMovie}
        onClick={handleOnCardClick}
      />
    </div>
  );


};

export default WatchListDetailPage;
