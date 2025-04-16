import style from './ReviewCard.module.css';
import { FontWeight } from '../../../../enums/FontWeight';
import { FontSize } from '../../../../enums/FontSize';
import { Color } from '../../../../enums/Color';
import Text from '../../../atoms/text/Text';
import { Review } from '../../../../entities/Review';
import Button from '../../../atoms/button/Button';
import { getUserId } from '../../../../utils/auth';

interface ReviewCardProps {
  review: Review & { username?: string; movieTitle?: string };
  onClick?: (reviewId: string, userId: string, movieId: string) => void;
  onEditClick?: (reviewId: string, movieId: string) => void;
}

const ReviewCard = ({ review, onClick, onEditClick }: ReviewCardProps) => {
  const isOwnReview = review.userId === getUserId();

  return (
    <div className={style.card} onClick={onClick ? () => onClick(review._id, review.userId, review.movieId) : undefined}>
      <Text fontWeight={FontWeight.Bold}>{review.rating}⭐</Text>
      <Text fontWeight={FontWeight.Regular}>{review.comment}</Text>
      <Text fontSize={FontSize.SMALL} fontColor={Color.BLACK}>
        {review.reviewDate.toLocaleDateString()}
      </Text>

      {review.username && (
        <Text fontSize={FontSize.SMALL} fontColor={Color.GRAY}>
          by {review.username}
        </Text>
      )}

      {review.movieTitle && (
        <Text fontSize={FontSize.SMALL} fontColor={Color.GRAY}>
          Movie: {review.movieTitle}
        </Text>
      )}

      {isOwnReview && onEditClick && (
        <div className={style.editButtonWrapper} onClick={(e) => e.stopPropagation()}>
          <Button variant="primary" onClick={() => onEditClick(review._id, review.movieId)}>
            Edit
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
