import MovieList from '../../organisms/movieList/MovieList';
import { useEffect, useState } from 'react';
import { apiRequest } from '../../../utils/apiClient';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../../../entities/Movie';
import Button from '../../atoms/button/Button';
import style from './AdminPage.module.css';

const AdminPage = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>();

  const handleOnMovieCardClick = (id: string) => {
    const movieExists = movies?.some((m) => m._id === id);
    if (!movieExists) {
      alert('This movie no longer exists.');
      return;
    }
    navigate(`/movie/${id}/edit`);
  };


  const handleOnDeleteClick = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this movie?');
    if (!confirmed) return;

    try {
      const token = localStorage.getItem('token');
      await apiRequest(`/movies/${id}`, {
        method: 'DELETE',
        authToken: token || '',
      });

      setMovies((prev) => prev?.filter((movie) => movie._id !== id));


    } catch (err) {
      console.error('Failed to delete movie:', err);
      alert('Failed to delete the movie. Please try again.');
    }
  };

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

  if (!movies) {
    return <div>Loading...</div>;
  }

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <Button onClick={() => navigate('/movie/create')}>Create New Movie</Button>
      </div>

      <MovieList
        onMovieClick={handleOnMovieCardClick}
        onDeleteClick={handleOnDeleteClick}
        movies={movies}
        showEditAndDelete={true}
      />
    </div>
  );
};

export default AdminPage;
