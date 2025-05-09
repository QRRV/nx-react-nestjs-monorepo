import { WatchListItem } from '../../../entities/WatchListItem';
import style from './WatchList.module.css';
import WatchListItemCard from '../../molecules/WatchListItemCard/WatchListItemCard';

interface WatchListProps {
  items: (WatchListItem & { movieTitle?: string })[];
  onEditClick?: (itemId: string) => void;
  onRemoveClick?: (itemId: string) => void;
  onGoToMovieClick?: (movieId: string) => void;
  onClick?: (itemId: string) => void;
}



const WatchList = ({ items, onEditClick, onRemoveClick, onGoToMovieClick, onClick }: WatchListProps) => {
  const sortedItems = [...items].sort((a, b) => a.priority - b.priority);

  return (
    <div className={style.wrapper}>
      {sortedItems.map((item) => (
        <WatchListItemCard
          key={item.id}
          item={item}
          onEditClick={onEditClick}
          onRemoveClick={onRemoveClick}
          onGoToMovieClick={onGoToMovieClick}
          onClick={onClick}
        />
      ))}
    </div>
  );
};

export default WatchList;
