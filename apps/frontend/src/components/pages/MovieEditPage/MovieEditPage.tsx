import MovieForm from '../../organisms/movieForm/MovieForm';
import { apiRequest } from '../../../utils/apiClient';
import { useEffect, useState } from 'react';
import { Movie } from '../../../entities/Movie';
import { useNavigate, useParams } from 'react-router-dom';
import Text from '../../atoms/text/Text';
import { Color } from '../../../enums/Color';
import { FontSize } from '../../../enums/FontSize';
import { RoutePath } from '../../../routes';

const MovieEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [fetchedMovie, setFetchedMovie] = useState<Movie>();
  const [errorMessage, setErrorMessage] = useState('');

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

        setFetchedMovie(response.data);
      } catch (err) {
        console.error('Fetching movie failed:', err);
        navigate(RoutePath.ADMIN)
      }
    };

    fetchMovie();
  }, [navigate, id]);

  const handleEdit = async (data: any) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/register');
        return;
      }

      const bodyWithoutId = {
        ...data,
        _id: undefined,
      };

      await apiRequest(`/movies/${id}`, {
        method: 'PATCH',
        body: bodyWithoutId,
        authToken: token,
      });

      navigate('/admin');
    } catch (err) {
      console.error('Failed to update movie:', err);
      setErrorMessage('Failed to update movie. Please try again.');
    }
  };


  if (!fetchedMovie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <MovieForm
        onSubmit={handleEdit}
        isEditMode
        initialValues={fetchedMovie}
      />
      {errorMessage && (
        <Text fontColor={Color.ERROR} fontSize={FontSize.SMALL}>
          {errorMessage}
        </Text>
      )}
    </div>
  );
};

export default MovieEditPage;
