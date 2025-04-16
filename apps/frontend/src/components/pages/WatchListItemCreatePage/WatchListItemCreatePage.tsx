import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiRequest } from '../../../utils/apiClient';
import { RoutePath } from '../../../routes';
import { getUserId } from '../../../utils/auth';
import { Movie } from '../../../entities/Movie';
import WatchListItemForm from '../../organisms/WatchListItemForm/WatchListItemForm';

const WatchListItemCreatePage = () => {
  const { userId, movieId } = useParams<{ userId: string; movieId?: string }>();
  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);

  const isOwnList = userId === getUserId();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        if (!movieId) {
          const res = await apiRequest('/movies', {
            method: 'GET',
            authToken: token,
          });
          setMovies(res.data);
        }
      } catch (err) {
        console.error('Failed to fetch movies:', err);
        setError('Could not load movie list.');
      }
    };

    fetchMovies();
  }, [movieId]);

  const handleCreate = async (data: { movieId?: string; priority: number }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token || !userId || !isOwnList) return;

      await apiRequest(`/watchlist`, {
        method: 'POST',
        authToken: token,
        body: {
          movieId: data.movieId,
          priority: Number(data.priority),
        },
      });

      navigate(`/users/${userId}/watchlist`);
    } catch (err) {
      console.error('Failed to create watchlist item:', err);
      setError('Creation failed. Please try again.');
    }
  };

  if (!isOwnList) {
    return <p style={{ color: 'red' }}>You are not authorized to access this watchlist.</p>;
  }

  return (
    <div>
      <WatchListItemForm
        initialValues={movieId ? { movieId } : {}}
        isEditMode={false}
        onSubmit={handleCreate}
        movies={movies}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default WatchListItemCreatePage;
