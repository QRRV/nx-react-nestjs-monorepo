import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../../utils/apiClient';
import MovieList from '../../organisms/movieList/MovieList';
import SwitchButton from '../../molecules/SwitchButton/SwitchButton';
import Dropdown from '../../molecules/dropdown/Dropdown';
import { Movie } from '../../../entities/Movie';
import { Genre } from '../../../enums/Genre';
import style from './LandingPage.module.css';
import { getUserId } from '../../../utils/auth';
import Text from '../../atoms/text/Text';
import { Color } from '../../../enums/Color';
import { FontSize } from '../../../enums/FontSize';
import { Recommendation } from '../../../entities/Recommendation';

const LandingPage = () => {
  const navigate = useNavigate();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [switchValue, setSwitchValue] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);


  const [genre, setGenre] = useState('');
  const [minRating, setMinRating] = useState('');
  const [limit, setLimit] = useState('');

  const genreOptions = Object.values(Genre).map((g) => ({
    label: g,
    value: g,
  }));

  const ratingOptions = Array.from({ length: 10 }, (_, i) => {
    const val = (i + 1).toString();
    return { label: val, value: val };
  });

  const limitOptions = ['5', '10', '15', '20', '50', '100'].map((val) => ({
    label: val,
    value: val,
  }));

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
  };

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!switchValue) return;

      try {
        const token = localStorage.getItem('token');
        const userId = getUserId();
        if (!token || !userId) return;

        const params = new URLSearchParams();
        if (genre) params.append('genre', genre);
        if (minRating) params.append('minRating', minRating);
        if (limit) params.append('limit', limit);

        const res = await apiRequest(
          `/users/${userId}/recommendations?${params.toString()}`,
          {
            method: 'GET',
            authToken: token,
          },
          true // Neo4j API
        );

        setRecommendations(res.data);
      } catch (err) {
        console.error('Fetching recommendations failed:', err);
      }
    };

    fetchRecommendations();
  }, [switchValue, genre, minRating, limit]);


  return (
    <>
      <div className={style.switchWrapper}>
        <SwitchButton checked={switchValue} onChange={setSwitchValue} />
        <Text
          fontSize={FontSize.MEDIUM}
          fontColor={Color.PRIMARY}
        >
          {switchValue
            ? '🚀 Friend-based recommendations enabled'
            : 'Browse all movies'}
        </Text>
      </div>




      <div className={style.filters}>
        <Dropdown
          label="Genre"
          options={genreOptions}
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder={'All Genres'}
        />
        {switchValue && (
          <Dropdown
            label="Min Rating"
            options={ratingOptions}
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
            placeholder={'All Ratings'}
          />
        )}
        <Dropdown
          label="Limit"
          options={limitOptions}
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          placeholder={'No Limit'}
        />
      </div>
      {error && (
        <Text fontSize={FontSize.SMALL} fontColor={Color.ERROR}>
          {error}
        </Text>
      )}
      <MovieList
        movies={
          switchValue
            ? recommendations
              .map((rec) => {
                const movie = movies.find((m) => m._id === rec.movieId);
                return movie ? { ...movie, avgRating: rec.avgRating, numFriendsRated: rec.numFriendsRated } : null;
              })
              .filter((m): m is Movie & { avgRating: number; numFriendsRated: number } => m !== null)
            : movies
              .filter((movie) => {
                return genre ? movie.genres.includes(genre) : true;
              })
              .slice(0, limit ? Number(limit) : movies.length)
        }
        onMovieClick={handleMovieClick}
      />

    </>
  );
};

export default LandingPage;
