import style from './MovieList.module.css';
import { Movie } from '../../../entities/Movie';
import MovieCard from '../../molecules/Card/MovieCard';
import Text from '../../atoms/text/Text';
import { FontSize } from '../../../enums/FontSize';
import { FontWeight } from '../../../enums/FontWeight';
import { Color } from '../../../enums/Color';

interface MovieWithRating extends Movie {
  avgRating?: number;
}

interface MovieListProps {
  movies: MovieWithRating[];
  onMovieClick?: (id: string) => void;
  showEditAndDelete?: boolean;
  onDeleteClick?: (id: string) => void;
}

const MovieList = ({
  movies,
  onMovieClick,
  showEditAndDelete,
  onDeleteClick,
}: MovieListProps) => {
  if (movies.length === 0) {
    return (
      <Text
        fontSize={FontSize.MEDIUM}
        fontWeight={FontWeight.Bold}
        fontColor={Color.GRAY}
      >
        No movies found.
      </Text>
    );
  }

  return (
    <div className={style.grid}>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          id={movie._id}
          title={movie.title}
          genres={movie.genres}
          avgRating={movie.avgRating}
          onClick={onMovieClick}
          showDelete={showEditAndDelete}
          onDeleteClick={onDeleteClick}
        />
      ))}
    </div>
  );
};

export default MovieList;
