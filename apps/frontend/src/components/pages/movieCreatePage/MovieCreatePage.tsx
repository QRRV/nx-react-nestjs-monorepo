import MovieForm from '../../organisms/movieForm/MovieForm';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../../../entities/Movie';
import { apiRequest } from '../../../utils/apiClient';
import { useState } from 'react';
import Text from '../../atoms/text/Text';
import { FontSize } from '../../../enums/FontSize';
import { Color } from '../../../enums/Color';
import { FontWeight } from '../../../enums/FontWeight';

const MovieCreatePage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async (data: Movie) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/register');
        return;
      }

      const bodyWithoutId = {
        ...data,
        id: data._id,
        _id: undefined,
      };

      await apiRequest('/movies', {
        method: 'POST',
        body: bodyWithoutId,
        authToken: token,
      });

      navigate(`/movie/${data._id}`);
    } catch (err: any) {
      console.error('Failed to create movie:', err);
      setError('Failed to create movie. Please check your input and try again.');
    }
  };

  return (
    <div>
      <MovieForm onSubmit={handleCreate} />

      {error && (
        <Text
          fontSize={FontSize.SMALL}
          fontColor={Color.ERROR}
          fontWeight={FontWeight.Medium}
        >
          {error}
        </Text>
      )}
    </div>
  );
};

export default MovieCreatePage;
