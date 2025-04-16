import Text from '../../atoms/text/Text';
import { Color } from '../../../enums/Color';
import { FontWeight } from '../../../enums/FontWeight';
import style from './NavItem.module.css'

interface NavItemProps {
  title: string;
  onClick?: () => void;
  isActive?: boolean;
}

const NavItem = (props: NavItemProps) => {
  return (
    <div className={style.navItem} onClick={props.onClick}>
      <Text fontColor={props.isActive ? Color.PRIMARY : Color.BLACK} fontWeight={FontWeight.Bold}>{props.title}</Text>
    </div>
  );
}

export default NavItem
