import { FontSize } from '../../../enums/FontSize';
import { FontWeight } from '../../../enums/FontWeight';
import { Color } from '../../../enums/Color';
import style from './Text.module.css';

interface TextProps {
  children: React.ReactNode;
  fontSize?: FontSize
  fontWeight?: FontWeight
  fontColor?: Color
  hidden?: boolean
}

const Text = ({ children, fontSize, fontWeight, fontColor, hidden }: TextProps) => {
  const className = [
    fontWeight,
    fontSize,
    fontColor,
  ].filter(Boolean).join(' ');

  return (
    <div hidden={hidden}>
      <p className={className + ' ' + style.text}>{children}</p>
    </div>
  );
};

export default Text;
