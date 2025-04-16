import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiRequest } from '../../../utils/apiClient';
import { Review } from '../../../entities/Review';
import { Movie } from '../../../entities/Movie';
import { RoutePath } from '../../../routes';
import { getUserId } from '../../../utils/auth';
import ReviewForm from '../../organisms/Review/ReviewForm';

const ReviewEditPage = () => {
  const { reviewId } = useParams<{ reviewId: string }>();
  const navigate = useNavigate();
  const [review, setReview] = useState<Review | null>(null);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviewAndMovie = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = getUserId();

        if (!token || !userId || !reviewId) {
          navigate(RoutePath.REGISTER);
          return;
        }

        const response = await apiRequest(`/users/${userId}/reviews`, {
          method: 'GET',
          authToken: token,
        });

        const allReviews: Review[] = response.data;
        const found = allReviews.find((r) => r._id === reviewId);

        if (!found) {
          navigate(RoutePath.HOME);
          return;
        }

        found.reviewDate = new Date(found.reviewDate);
        setReview(found);

        const movieResponse = await apiRequest(`/movies/${found.movieId}`, {
          method: 'GET',
          authToken: token,
        });

        setMovie(movieResponse.data);
      } catch (err) {
        console.error('Failed to fetch review or movie:', err);
        setError('Failed to fetch review. Please try again later.');
      }
    };

    fetchReviewAndMovie();
  }, [reviewId, navigate]);

  const handleEdit = async (data: { rating: number; comment: string }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token || !reviewId) return;

      const { rating, comment } = data;

      await apiRequest(`/reviews/${reviewId}`, {
        method: 'PATCH',
        authToken: token,
        body: {
          rating: Number(rating),
          comment
        },
      });

      navigate(RoutePath.HOME);
    } catch (err) {
      console.error('Failed to update review:', err);
      setError('Failed to update review. Please try again.');
    }
  };


  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!review || !movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ReviewForm
        initialValues={{
          movieId: review.movieId,
          movieTitle: movie.title,
          rating: review.rating,
          comment: review.comment,
        }}
        onSubmit={handleEdit}
        isEditMode={true}
      />

    </div>
  );
};

export default ReviewEditPage;
