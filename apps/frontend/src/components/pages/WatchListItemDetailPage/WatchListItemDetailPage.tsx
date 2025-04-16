import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiRequest } from '../../../utils/apiClient';
import { getUserId } from '../../../utils/auth';
import { RoutePath } from '../../../routes';
import Text from '../../atoms/text/Text';
import Button from '../../atoms/button/Button';
import { FontSize } from '../../../enums/FontSize';
import { FontWeight } from '../../../enums/FontWeight';
import { Color } from '../../../enums/Color';
import style from './WatchlistItemDetailPage.module.css';
import { WatchListItem } from '../../../entities/WatchListItem';
import { Movie } from '../../../entities/Movie';

const WatchlistItemDetailPage = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const [item, setItem] = useState<WatchListItem | null>(null);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token || !itemId || !userId) {
          navigate(RoutePath.REGISTER);
          return;
        }

        const res = await apiRequest(`/users/${userId}/watchlist`, {
          method: 'GET',
          authToken: token,
        });

        const match = res.data.find((i: WatchListItem) => i.id === itemId);
        if (!match) {
          navigate(RoutePath.HOME);
          return;
        }

        match.addedAt = new Date(match.addedAt);
        setItem(match);

        const movieRes = await apiRequest(`/movies/${match.movieId}`, {
          method: 'GET',
          authToken: token,
        });

        setMovie(movieRes.data);

      } catch (err) {
        console.error('Failed to load watchlist item:', err);
        setError('Could not load watchlist item. Please try again.');
      }
    };

    fetchData();
  }, [itemId, userId, navigate]);

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to remove this movie from your watchlist?');
    if (!confirmed || !itemId) return;
    if (!userId || userId !== getUserId()) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate(RoutePath.REGISTER);
        return;
      }

      await apiRequest(`/watchlist/${itemId}`, {
        method: 'DELETE',
        authToken: token,
      });

      navigate(`/users/${userId}/watchlist`);
    } catch (err) {
      console.error('Failed to delete watchlist item:', err);
      setError('Failed to delete watchlist item. Please try again.');
      navigate(`//${userId}/watchlist`);

    }
  };

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!item || !movie) return <div>Loading...</div>;

  return (
    <div className={style.wrapper}>
      <div className={style.card}>
        <Text fontSize={FontSize.XXLARGE} fontWeight={FontWeight.ExtraBold}>
          Watchlist item: "{movie.title}"
        </Text>

        <div className={style.detailRow}>
          <Text fontWeight={FontWeight.Bold}>Priority:</Text>
          <Text>{item.priority}</Text>
        </div>

        <div className={style.detailRow}>
          <Text fontWeight={FontWeight.Bold}>Watched:</Text>
          <Text>{item.watched ? 'Yes' : 'No'}</Text>
        </div>

        <Text fontSize={FontSize.SMALL} fontColor={Color.GRAY}>
          Added on {item.addedAt.toLocaleDateString()}
        </Text>

        <div className={style.actions} hidden={userId !== getUserId()}>
          <Button onClick={() => navigate(`/users/${userId}/watchlist/${item.id}/edit`)}>Edit</Button>
          <Button variant="danger" onClick={handleDelete}>Remove</Button>
        </div>
      </div>
    </div>
  );
};

export default WatchlistItemDetailPage;
