import { useForm } from 'react-hook-form';
import Input from '../../molecules/input/Input';
import Text from '../../atoms/text/Text';
import Button from '../../atoms/button/Button';
import Dropdown from '../../molecules/dropdown/Dropdown';
import { FontWeight } from '../../../enums/FontWeight';
import { FontSize } from '../../../enums/FontSize';
import { Color } from '../../../enums/Color';
import style from './WatchListItemForm.module.css';
import { Movie } from '../../../entities/Movie';
import { useEffect, useState } from 'react';
import { apiRequest } from '../../../utils/apiClient';
import Checkbox from '../../molecules/Checkbox/Checkbox';

interface WatchListItemFormValues {
  movieId?: string;
  priority: number;
  watched?: boolean;
}

interface WatchListItemFormProps {
  initialValues?: Partial<WatchListItemFormValues>;
  isEditMode?: boolean;
  onSubmit: (data: WatchListItemFormValues) => void;
  movies?: Movie[];
}

const WatchListItemForm = ({
  initialValues = {},
  isEditMode = false,
  onSubmit,
  movies,
}: WatchListItemFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<WatchListItemFormValues>({
    mode: 'onChange',
    defaultValues: {
      movieId: initialValues.movieId || '',
      priority: initialValues.priority ?? 1,
      watched: initialValues.watched ?? false,
    },
  });

  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!initialValues?.movieId || !token) return;

        const response = await apiRequest(`/movies/${initialValues.movieId}`, {
          method: 'GET',
          authToken: token,
        });

        setMovie(response.data);
      } catch (err) {
        console.error('Failed to fetch movie:', err);
      }
    };

    fetchMovie();
  }, [initialValues?.movieId]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
      <Text
        fontSize={FontSize.XLARGE}
        fontWeight={FontWeight.ExtraBold}
        fontColor={Color.PRIMARY}
      >
        {isEditMode
          ? `Edit Watchlist Item${movie?.title ? ' for ' + movie.title : ''}`
          : initialValues.movieId && movie?.title
            ? `Add to Watchlist for ${movie.title}`
            : 'Add to Watchlist'}
      </Text>


      {!isEditMode && (
        <div>
          {initialValues.movieId ? (
            <>
              <Input
                label="IMDb Movie ID"
                value={initialValues.movieId}
                disabled
              />
              <input
                type="hidden"
                {...register('movieId')}
                value={initialValues.movieId}
              />
            </>
          ) : (
            <Dropdown
              label="Select a Movie"
              options={
                movies?.map((m) => ({ label: m.title, value: m._id })) || []
              }
              {...register('movieId', {
                required: 'Movie selection is required',
              })}
              error={errors.movieId?.message}
            />

          )}
        </div>
      )}

      <div>
        <Input
          label="Priority (1 = highest)"
          placeholder="1"
          type="number"
          {...register('priority', {
            required: true,
            min: { value: 1, message: 'Minimum priority is 1' },
          })}
        />
        {errors.priority && (
          <Text fontColor={Color.ERROR} fontSize={FontSize.SMALL}>
            {errors.priority.message}
          </Text>
        )}
      </div>

      {isEditMode && (
        <Checkbox label="Mark as watched" {...register('watched')} />
      )}

      <div className={style.submitButtonWrapper}>
        <Button type="submit" disabled={!isValid}>
          {isEditMode ? 'Save Changes' : 'Add to Watchlist'}
        </Button>
      </div>
    </form>
  );
};

export default WatchListItemForm;
