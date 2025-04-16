import { useForm } from 'react-hook-form';
import Input from '../../molecules/input/Input';
import Text from '../../atoms/text/Text';
import Button from '../../atoms/button/Button';
import { FontWeight } from '../../../enums/FontWeight';
import { FontSize } from '../../../enums/FontSize';
import { Color } from '../../../enums/Color';
import style from './ReviewForm.module.css';

interface ReviewFormValues {
  movieId: string;
  rating: number;
  comment: string;
}

interface ReviewFormProps {
  initialValues?: Partial<ReviewFormValues> & { movieTitle?: string };
  onSubmit: (data: ReviewFormValues) => void;
  isEditMode?: boolean;
}


const ReviewForm = ({ initialValues = {}, onSubmit, isEditMode }: ReviewFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ReviewFormValues>({
    mode: 'onChange',
    defaultValues: {
      movieId: initialValues.movieId || '',
      rating: initialValues.rating || 1,
      comment: initialValues.comment || '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Text
        fontSize={FontSize.XLARGE}
        fontWeight={FontWeight.ExtraBold}
        fontColor={Color.PRIMARY}
      >
        {isEditMode ? (
          <>Edit Review for {initialValues.movieTitle || 'this movie'}</>
        ) : (
          <>Leave a Review for {initialValues.movieTitle || 'this movie'}</>
        )}
      </Text>

      {initialValues.movieTitle && (
        <div>
          <Input
            label="Movie"
            placeholder="Movie title"
            value={initialValues.movieTitle}
            disabled
          />
        </div>
      )}

      <input type="hidden" {...register('movieId')} />

      <div>
        <Input
          label="Rating"
          placeholder="e.g. 8.5"
          type="number"
          step="0.1"
          {...register('rating', {
            required: true,
            min: { value: 1, message: 'Rating must be at least 1' },
            max: { value: 10, message: 'Rating must be at most 10' },
          })}
        />
        {errors.rating && (
          <Text fontColor={Color.ERROR} fontSize={FontSize.SMALL}>
            {errors.rating.message}
          </Text>
        )}
      </div>

      <div>
        <Input
          label="Comment"
          placeholder="Write your review here..."
          {...register('comment', {
            required: 'Comment is required',
          })}
        />
        {errors.comment && (
          <Text fontColor={Color.ERROR} fontSize={FontSize.SMALL}>
            {errors.comment.message}
          </Text>
        )}
      </div>

      <div className={style.submitButtonWrapper}>
        <Button type="submit" disabled={!isValid}>
          Submit Review
        </Button>
      </div>
    </form>
  );
};

export default ReviewForm;
