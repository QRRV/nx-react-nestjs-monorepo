
import { Review } from '../../../entities/Review';
import Text from '../../atoms/text/Text';
import { FontSize } from '../../../enums/FontSize';
import { Color } from '../../../enums/Color';
import style from './ReviewList.module.css';
import ReviewCard from '../../molecules/Card/ReviewCard/ReviewCard';
import { getUserId } from '../../../utils/auth';
import { useNavigate } from 'react-router-dom';

interface ReviewListProps {
  reviews: (Review & { username?: string; movieTitle?: string })[];
}



const ReviewList = ({ reviews }: ReviewListProps) => {
  const navigate = useNavigate();

  const handleOnReviewClick = (reviewId: string, userId: string, movieId: string) => {
      navigate(`/movie/${movieId}/review/${reviewId}`);
  }

  const handleOnEditClick = (reviewId: string, movieId: string) => {
    navigate(`/movie/${movieId}/review/${reviewId}/edit`);
  }

  return (
    <div className={style.reviewsSection}>
      {reviews.length > 0 ? (
        reviews.map((review) => <ReviewCard key={review._id} review={review} onClick={handleOnReviewClick} onEditClick={handleOnEditClick} />)
      ) : (
        <Text fontColor={Color.GRAY} fontSize={FontSize.SMALL}>
          No reviews yet
        </Text>
      )}
    </div>
  );
};

export default ReviewList;
