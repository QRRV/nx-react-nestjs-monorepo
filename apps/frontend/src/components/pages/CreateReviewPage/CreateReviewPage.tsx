import { useParams, useNavigate } from 'react-router-dom';
import { apiRequest } from '../../../utils/apiClient';
import ReviewForm from '../../organisms/Review/ReviewForm';
import { useEffect, useState } from 'react';
import { Movie } from '../../../entities/Movie';

const CreateReviewPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [movie, setMovie] = useState<Movie | null>(null);

  const handleCreate = async (data: { rating: number; comment: string }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token || !movieId) {
        navigate('/register');
        return;
      }

      await apiRequest('/reviews', {
        method: 'POST',
        authToken: token,
        body: {
          movieId,
          rating: Number(data.rating),
          comment: data.comment,
        },
      });

      navigate(`/movie/${movieId}`);
    } catch (err) {
      console.error('Failed to create review:', err);
      setError('Failed to submit review. Please try again.');
    }
  };

  useEffect(() => {
    const fetchMovie = async () => {
      if (!movieId) return;

      try {
        const token = localStorage.getItem('token');
        const res = await apiRequest(`/movies/${movieId}`, {
          method: 'GET',
          authToken: token || '',
        });

        setMovie(res.data);
      } catch (err) {
        console.error('Failed to fetch movie:', err);
        setError('Could not load movie data. Please try again.');
      }
    };

    fetchMovie();
  }, [movieId]);

  if (!movie) return <div>Loading movie...</div>;

  return (
    <div>
      <ReviewForm
        onSubmit={handleCreate}
        initialValues={{
          movieId: movie._id,
          movieTitle: movie.title,
        }}
        isEditMode={false}
      />

      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
    </div>
  );
};

export default CreateReviewPage;
