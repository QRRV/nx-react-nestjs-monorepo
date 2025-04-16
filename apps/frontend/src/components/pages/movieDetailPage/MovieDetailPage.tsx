import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiRequest } from '../../../utils/apiClient';
import { Movie } from '@moviebuddy/movie';
import Text from '../../atoms/text/Text';
import Button from '../../atoms/button/Button';
import style from './MovieDetailPage.module.css';
import { FontSize } from '../../../enums/FontSize';
import { FontWeight } from '../../../enums/FontWeight';
import { Color } from '../../../enums/Color';
import { Review, ReviewWithUsername } from '../../../entities/Review';
import ReviewList from '../../organisms/reviewList/ReviewList';
import { RoutePath } from '../../../routes';
import { getUserId } from '../../../utils/auth';

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie>();
  const [reviews, setReviews] = useState<ReviewWithUsername[]>([]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/register');
          return;
        }

        const response = await apiRequest(`/movies/${id}`, {
          method: 'GET',
          authToken: token,
        });

        setMovie(response.data);
      } catch (err) {
        console.error('Fetching movie failed:', err);
      }
    };

    fetchMovie();
  }, [navigate, id]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/register');
          return;
        }

        const response = await apiRequest(`/movies/${id}/reviews`, {
          method: 'GET',
          authToken: token,
        });

        const reviewsRaw = response.data as Review[];

        const reviewsWithUsernames = await Promise.all(
          reviewsRaw.map(async (review) => {
            try {
              const userRes = await apiRequest(`/users/${review.userId}`, {
                method: 'GET',
                authToken: token,
              });

              return {
                ...review,
                username: userRes.data.username,
                reviewDate: new Date(review.reviewDate),
              };
            } catch {
              return {
                ...review,
                username: 'Unknown',
                reviewDate: new Date(review.reviewDate),
              };
            }
          })
        );

        setReviews(reviewsWithUsernames);
      } catch (err) {
        console.error('Fetching reviews failed:', err);
        navigate(RoutePath.HOME);
      }
    };

    fetchReviews();
  }, [navigate, id]);

  const handleCreateReviewButtonClick = () => {
    if (!movie) return;
    navigate(`/movie/${movie._id}/review`);
  };

  const handleCreateWatchListItemButtonClick = () => {
    if (!movie) return;
    navigate(`/users/${getUserId()}/watchlist/create/${movie._id}`);
  }

  const hasUserReviewed = (): boolean => {
    const userId = getUserId();
    return reviews.some((r) => r.userId === userId);
  };


  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className={style.wrapper}>
      <img
        src="/assets/MovieImage.png"
        alt={movie.title}
        className={style.poster}
      />

      <div className={style.content}>
        <Text fontSize={FontSize.XXLARGE} fontWeight={FontWeight.ExtraBold}>
          {movie.title}
        </Text>

        <Text fontSize={FontSize.MEDIUM} fontColor={Color.BLACK}>
          {movie.description}
        </Text>

        <Text fontSize={FontSize.MEDIUM} fontWeight={FontWeight.Medium}>
          {movie.genres.join(', ')}
        </Text>

        <Text fontSize={FontSize.SMALL} fontColor={Color.GRAY}>
          Released on: {new Date(movie.releaseDate).toLocaleDateString()}
        </Text>

        {movie._id && (
          <Text fontSize={FontSize.SMALL} fontColor={Color.PRIMARY}>
            <a href={`https://www.imdb.com/title/${movie._id}`} target="_blank" rel="noopener noreferrer">
              View on IMDb
            </a>
          </Text>
        )}

        <div className={style.actions}>
          <Button disabled={hasUserReviewed()} onClick={handleCreateReviewButtonClick}>Write a Review</Button>
          <Button onClick={handleCreateWatchListItemButtonClick}>Add to Watchlist</Button>
        </div>

        <div className={style.reviewsSection}>
          <ReviewList reviews={reviews} />
        </div>

      </div>
    </div>
  );
};

export default MovieDetailPage;
