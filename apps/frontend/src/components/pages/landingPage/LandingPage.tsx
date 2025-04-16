import Text from '../../atoms/text/Text';
import { useEffect, useState } from 'react';
import { apiRequest } from '../../../utils/apiClient';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../../molecules/Card/MovieCard';
import style from './LandingPage.module.css';
import { Movie } from '../../../entities/Movie';
import MovieList from '../../organisms/movieList/MovieList';

const LandingPage = () => {

  const navigate = useNavigate();

  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/register');
          return;
        }

        const response = await apiRequest('/movies', {
          method: 'GET',
          authToken: token,
        });

        setMovies(response.data);
      } catch (err) {
        console.error('Fetching movies failed:', err);
      }
    };

    fetchMovies();
  }, [navigate]);


  const handleMovieClick = (id: string) => {

    navigate(`/movie/${id}`);
  }


  return (
    <>
      <MovieList movies={movies} onMovieClick={handleMovieClick} />
    </>
  );

}

export default LandingPage;
