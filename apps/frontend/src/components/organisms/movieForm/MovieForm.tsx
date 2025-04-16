import { SubmitHandler, useForm } from 'react-hook-form';
import Input from '../../molecules/input/Input';
import Text from '../../atoms/text/Text';
import Button from '../../atoms/button/Button';
import { FontWeight } from '../../../enums/FontWeight';
import { FontSize } from '../../../enums/FontSize';
import { Color } from '../../../enums/Color';
import { Movie } from '../../../entities/Movie';
import DatePicker from '../../molecules/datePicker/DatePicker';
import { useEffect } from 'react';
import styles from './MovieForm.module.css';
import MultiSelectDropdown from '../../molecules/MultiSelectDropdown/MultiSelectDropdown';
import { Genre } from '../../../enums/Genre';

interface MovieFormValues {
  id: string;
  title: string;
  description: string;
  genres: string[];
  releaseDate: string;
}


interface MovieFormProps {
  initialValues?: Partial<Movie>;
  onSubmit: (data: Movie) => void;
  isEditMode?: boolean;
}

const MovieForm = ({ initialValues = {}, onSubmit, isEditMode = false }: MovieFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<MovieFormValues>({
    mode: 'onChange',
    defaultValues: {
      id: initialValues._id || '',
      title: initialValues.title || '',
      description: initialValues.description || '',
      genres: initialValues.genres || [],
      releaseDate: initialValues.releaseDate
        ? new Date(initialValues.releaseDate).toISOString().split('T')[0]
        : '',
    },
  });

  const imdbId = watch('id');
  const isValidImdbId = /^tt\d{7,8}$/.test(imdbId);

  const handleFormSubmit: SubmitHandler<MovieFormValues> = (formData) => {
    const payload: Movie = {
      _id: formData.id,
      title: formData.title,
      description: formData.description,
      genres: formData.genres,
      releaseDate: formData.releaseDate,
    };
    onSubmit(payload);
  };


  useEffect(() => {
    if (initialValues?._id) setValue('id', initialValues._id);
    if (initialValues?.releaseDate) {
      const formatted = new Date(initialValues.releaseDate).toISOString().split('T')[0];
      setValue('releaseDate', formatted);
    }
  }, [initialValues, setValue]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Text fontSize={FontSize.XLARGE} fontWeight={FontWeight.ExtraBold} fontColor={Color.PRIMARY}>
        {isEditMode ? 'Edit Movie' : 'Create Movie'}
      </Text>

      <div>
        <Input
          label="Movie ID"
          placeholder="tt1234567"
          {...register('id', {
            required: true,
            pattern: {
              value: /^tt\d{7,8}$/,
              message: 'Invalid IMDb ID format. Should start with "tt" followed by 7-8 digits.',
            },
          })}
          disabled={isEditMode}
        />
        {errors.id?.message && (
          <Text fontColor={Color.ERROR} fontSize={FontSize.SMALL}>
            {errors.id.message}
          </Text>
        )}
        {isValidImdbId ? (
          <Text fontColor={Color.GRAY} fontSize={FontSize.SMALL}>
            View this movie on&nbsp;
            <a
              href={`https://www.imdb.com/title/${imdbId}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}
            >
              IMDb
            </a>
          </Text>
        ) : (
          <Text fontColor={Color.GRAY} fontSize={FontSize.SMALL}>
            You can find IMDb IDs at&nbsp;
            <a
              href="https://www.imdb.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}
            >
              IMDb.com
            </a>
          </Text>
        )}
      </div>

      <div>
        <Input
          label="Title"
          placeholder="Movie Title"
          {...register('title', { required: true })}
        />
        {errors.title && (
          <Text fontColor={Color.ERROR} fontSize={FontSize.SMALL}>
            Title is required
          </Text>
        )}
      </div>

      <div>
        <Input
          label="Description"
          placeholder="Movie Description"
          {...register('description', { required: true })}
        />
        {errors.description && (
          <Text fontColor={Color.ERROR} fontSize={FontSize.SMALL}>
            Description is required
          </Text>
        )}
      </div>

      <div>
        <MultiSelectDropdown
          label="Genres"
          options={Object.values(Genre).map((g) => ({ value: g, label: g }))}
          {...register('genres', { required: 'At least one genre is required' })}
          error={errors.genres?.message}
        />
      </div>


      <div>
        <DatePicker
          label="Release Date"
          {...register('releaseDate', { required: true })}
        />
        {errors.releaseDate && (
          <Text fontColor={Color.ERROR} fontSize={FontSize.SMALL}>
            Release date is required
          </Text>
        )}
      </div>

      <div className={styles.submitButtonWrapper}>
        <Button type="submit" disabled={!isValid}>
          {isEditMode ? 'Save Changes' : 'Create Movie'}
        </Button>
      </div>
    </form>
  );
};

export default MovieForm;
