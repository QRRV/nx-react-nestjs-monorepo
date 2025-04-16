import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiRequest } from '../../../utils/apiClient';
import { Review } from '../../../entities/Review';
import { User } from '../../../entities/User';
import { Movie } from '../../../entities/Movie';
import { getUserId } from '../../../utils/auth';
import { RoutePath } from '../../../routes';
import Text from '../../atoms/text/Text';
import Button from '../../atoms/button/Button';
import { FontSize } from '../../../enums/FontSize';
import { FontWeight } from '../../../enums/FontWeight';
import { Color } from '../../../enums/Color';
import style from './ReviewDetailPage.module.css';
import { Star, StarHalf, StarOff } from 'lucide-react';

const ReviewDetailPage = () => {
  const { reviewId } = useParams<{ reviewId: string }>();
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate();

  const [review, setReview] = useState<Review | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token || !reviewId) {
          navigate(RoutePath.REGISTER);
          return;
        }

        const reviewsRes = await apiRequest(`/movies/${movieId}/reviews`, {
          method: 'GET',
          authToken: token,
        });

        const match = reviewsRes.data.find((r: Review) => r._id === reviewId);
        if (!match) {
          navigate(RoutePath.HOME);
          return;
        }

        match.reviewDate = new Date(match.reviewDate);
        setReview(match);

        const userRes = await apiRequest(`/users/${match.userId}`, {
          method: 'GET',
          authToken: token,
        });
        setUser(userRes.data);

        const movieRes = await apiRequest(`/movies/${match.movieId}`, {
          method: 'GET',
          authToken: token,
        });
        setMovie(movieRes.data);

      } catch (err) {
        console.error('Failed to load review detail:', err);
        setError('Could not load review. Please try again.');
      }
    };

    fetchData();
  }, [navigate, reviewId]);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.25 && rating % 1 < 0.75;
    const emptyStars = 10 - fullStars - (hasHalf ? 1 : 0);

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} size={18} fill="gold" stroke="gold" />);
    }

    if (hasHalf) {
      stars.push(<StarHalf key="half" size={18} fill="gold" stroke="gold" />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<StarOff key={`empty-${i}`} size={18} stroke="gold" />);
    }

    return stars;
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this review?');
    if (!confirmed || !reviewId) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate(RoutePath.REGISTER);
        return;
      }

      await apiRequest(`/reviews/${reviewId}`, {
        method: 'DELETE',
        authToken: token,
      });

      navigate(`/movie/${movieId}`);
    } catch (err) {
      console.error('Failed to delete review:', err);
      setError('Failed to delete review. Please try again.');
    }
  };




  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!review || !user || !movie) return <div>Loading...</div>;

  return (
    <div className={style.wrapper}>
      <div className={style.card}>
        <Text fontSize={FontSize.XXLARGE} fontWeight={FontWeight.ExtraBold}>
          Review for "{movie.title}"
        </Text>

        <div className={style.ratingRow}>
          <Text fontSize={FontSize.MEDIUM} fontColor={Color.PRIMARY} fontWeight={FontWeight.Bold}>
            {review.rating}
          </Text>
          <div className={style.stars}>
            {renderStars(review.rating)}
          </div>
        </div>

        <Text fontColor={Color.BLACK}>{review.comment}</Text>

        <Text fontSize={FontSize.SMALL} fontColor={Color.GRAY}>
          Posted on {review.reviewDate.toLocaleDateString()}
        </Text>

        <Text fontSize={FontSize.SMALL} fontColor={Color.GRAY}>
          by {user.username}
        </Text>

        <div className={style.actions}>
          <Button onClick={() => navigate(`/profile/${user.id}`)}>View Profile</Button>

          {getUserId() === user.id && (
            <>
              <Button onClick={() => navigate(`/movie/${movie._id}/review/${review._id}/edit`)}>
                Edit Review
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete Review
              </Button>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default ReviewDetailPage;
