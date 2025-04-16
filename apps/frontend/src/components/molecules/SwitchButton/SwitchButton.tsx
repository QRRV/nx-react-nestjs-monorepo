import style from './SwitchButton.module.css';
import { FontSize } from '../../../enums/FontSize';
import { FontWeight } from '../../../enums/FontWeight';
import { Color } from '../../../enums/Color';
import Text from '../../atoms/text/Text';

interface SwitchButtonProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const SwitchButton = ({ label, checked, onChange }: SwitchButtonProps) => {
  return (
    <label className={style.switchWrapper}>
      {label && (
        <Text
          fontSize={FontSize.MEDIUM}
          fontWeight={FontWeight.Regular}
          fontColor={Color.BLACK}
        >
          {label}
        </Text>
      )}

      <div className={style.switch}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className={style.slider}></span>
      </div>
    </label>
  );
};

export default SwitchButton;
