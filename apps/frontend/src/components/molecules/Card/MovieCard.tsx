import style from './MovieCard.module.css';
import Text from '../../atoms/text/Text';
import { FontWeight } from '../../../enums/FontWeight';
import { FontSize } from '../../../enums/FontSize';
import Button from '../../atoms/button/Button';

interface MovieCardProps {
  id: string;
  title: string;
  genres: string[];
  avgRating?: number;
  onClick?: (id: string) => void;
  showDelete?: boolean;
  onDeleteClick?: (id: string) => void;
}

const MovieCard = ({
  id,
  title,
  genres,
  avgRating,
  onClick,
  showDelete,
  onDeleteClick,
}: MovieCardProps) => {
  const imageUrl = '/assets/MovieImage.png';

  return (
    <div className={style.card} onClick={() => onClick?.(id)}>
      <img src={imageUrl} alt={title} className={style.image} />
      <div className={style.content}>
        <Text fontWeight={FontWeight.Bold} fontSize={FontSize.LARGE}>
          {title}
        </Text>

        <Text fontWeight={FontWeight.Regular} fontSize={FontSize.MEDIUM}>
          {genres.join(', ')}
        </Text>

        {avgRating !== undefined && (
          <Text fontWeight={FontWeight.Regular} fontSize={FontSize.SMALL}>
            ⭐ {avgRating.toFixed(1)}
          </Text>
        )}

        {showDelete && (
          <div className={style.actions}>
            <Button
              variant="danger"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteClick?.(id);
              }}
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
