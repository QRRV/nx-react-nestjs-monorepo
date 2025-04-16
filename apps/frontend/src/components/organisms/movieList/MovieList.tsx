// components/molecules/MovieList/MovieList.tsx
import style from './MovieList.module.css';
import { Movie } from '../../../entities/Movie';
import MovieCard from '../../molecules/Card/MovieCard';

interface MovieListProps {
  movies: Movie[];
  onMovieClick?: (id: string) => void;
  showEditAndDelete?: boolean;
  onDeleteClick?: (id: string) => void;
}



const MovieList = ({ movies, onMovieClick, showEditAndDelete, onDeleteClick }: MovieListProps) => {
  return (
    <div className={style.grid}>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          id={movie._id}
          title={movie.title}
          genres={movie.genres}
          onClick={onMovieClick}
          showDelete={showEditAndDelete}
          onDeleteClick={onDeleteClick}
        />

      ))}
    </div>
  );
};

export default MovieList;
