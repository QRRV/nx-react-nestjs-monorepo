import style from './WatchListItemCard.module.css';
import Text from '../../atoms/text/Text';
import Button from '../../atoms/button/Button';
import { FontWeight } from '../../../enums/FontWeight';
import { FontSize } from '../../../enums/FontSize';
import { Color } from '../../../enums/Color';
import { WatchListItem } from '../../../entities/WatchListItem';

interface WatchListItemCardProps {
  item: WatchListItem & { movieTitle?: string };
  onEditClick?: (itemId: string) => void;
  onRemoveClick?: (itemId: string) => void;
  onGoToMovieClick?: (movieId: string) => void;
}

const WatchListItemCard = ({ item, onEditClick, onRemoveClick, onGoToMovieClick }: WatchListItemCardProps) => {
  return (
    <div className={style.card}>
      <div className={style.header}>
        <Text fontWeight={FontWeight.Bold} fontSize={FontSize.LARGE}>
          {item.movieTitle || `Priority ${item.priority}`}
        </Text>
        <Text fontColor={Color.GRAY} fontSize={FontSize.SMALL}>
          Added on {new Date(item.addedAt).toLocaleDateString()}
        </Text>
      </div>

      <Text fontSize={FontSize.SMALL}>
        Priority: {item.priority}
      </Text>

      <Text fontSize={FontSize.SMALL} fontColor={item.watched ? Color.PRIMARY : Color.GRAY}>
        {item.watched ? 'Watched' : 'Not Watched'}
      </Text>

      <div className={style.actions}>
        {onGoToMovieClick && (
          <Button onClick={() => onGoToMovieClick(item.movieId)}>
            Go to Movie
          </Button>
        )}
        {onEditClick && (
          <Button onClick={() => onEditClick(item.id)}>
            Edit
          </Button>
        )}
        {onRemoveClick && (
          <Button variant="danger" onClick={() => onRemoveClick(item.id)}>
            Remove
          </Button>
        )}
      </div>
    </div>
  );
};

export default WatchListItemCard;

