import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiRequest } from '../../../utils/apiClient';
import { WatchListItem } from '../../../entities/WatchListItem';
import { getUserId } from '../../../utils/auth';
import { RoutePath } from '../../../routes';
import WatchListItemForm from '../../organisms/WatchListItemForm/WatchListItemForm';
import { Movie } from '../../../entities/Movie';

const WatchListItemEditPage = () => {
  const { userId, itemId, movieId } = useParams<{
    userId: string;
    itemId: string;
    movieId?: string;
  }>();
  const navigate = useNavigate();

  const [item, setItem] = useState<WatchListItem | null>(null);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);

  const currentUserId = getUserId();
  const isOwnWatchlist = currentUserId === userId;

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token || !userId || !itemId || !isOwnWatchlist) {
          navigate(RoutePath.REGISTER);
          return;
        }

        const response = await apiRequest(`/users/${userId}/watchlist`, {
          method: 'GET',
          authToken: token,
        });

        const match = response.data.find((i: WatchListItem) => i.id === itemId);
        if (!match) {
          navigate(RoutePath.HOME);
          return;
        }

        match.addedAt = new Date(match.addedAt);
        setItem(match);
      } catch (err) {
        console.error('Failed to load watchlist item:', err);
        setError('Failed to load item. Please try again.');
      }
    };

    fetchItem();
  }, [userId, itemId, navigate, isOwnWatchlist]);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        if (movieId) {
          const res = await apiRequest(`/movies/${movieId}`, {
            method: 'GET',
            authToken: token,
          });
          setMovie(res.data);
        } else {
          const res = await apiRequest('/movies', {
            method: 'GET',
            authToken: token,
          });

          setMovies(res.data);
        }
      } catch (err) {
        console.error('Failed to load movie(s):', err);
      }
    };

    fetchMovieData();
  }, [movieId]);

  const handleEdit = async (data: { priority: number; watched?: boolean }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token || !userId || !itemId) return;

      await apiRequest(`/watchlist/${itemId}`, {
        method: 'PATCH',
        authToken: token,
        body: {
          priority: Number(data.priority),
          watched: data.watched,
        },
      });

      navigate(`/users/${userId}/watchlist`);
    } catch (err) {
      console.error('Failed to update item:', err);
      setError('Update failed. Please try again.');
    }
  };

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!item) return <div>Loading...</div>;

  return (
    <div>
      <WatchListItemForm
        initialValues={{
          priority: item.priority,
          watched: item.watched,
          movieId: item.movieId,
        }}
        isEditMode={true}
        onSubmit={handleEdit}
        movies={movie ? [] : movies}
      />
    </div>
  );
};

export default WatchListItemEditPage;
