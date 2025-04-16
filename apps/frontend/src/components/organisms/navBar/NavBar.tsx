import style from './NavBar.module.css';
import Text from '../../atoms/text/Text';
import { Color } from '../../../enums/Color';
import { FontSize } from '../../../enums/FontSize';
import { FontWeight } from '../../../enums/FontWeight';

interface NavBarProps {
  children: React.ReactNode;
}

const NavBar = ({ children}: NavBarProps) => {
  return (
    <div className={style.navContainer}>
      <div className={style.title}>
        <Text fontColor={Color.PRIMARY} fontSize={FontSize.LARGE} fontWeight={FontWeight.ExtraBold}>MovieBuddy</Text>
      </div>
      <div className={style.navItems}>
        {children}
      </div>
    </div>
  );
};

export default NavBar;
