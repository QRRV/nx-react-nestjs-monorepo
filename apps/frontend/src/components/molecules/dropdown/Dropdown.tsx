import style from './Dropdown.module.css';
import { forwardRef, SelectHTMLAttributes } from 'react';
import { Color } from '../../../enums/Color';
import { FontSize } from '../../../enums/FontSize';
import { FontWeight } from '../../../enums/FontWeight';
import Text from '../../atoms/text/Text';

interface DropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { label: string; value: string }[];
  label?: string;
  error?: string;
}


const Dropdown = forwardRef<HTMLSelectElement, DropdownProps>(
  ({ options, label, error, ...rest }, ref) => {
    return (
      <div className={style.wrapper}>
        {label && (
          <Text
            fontColor={Color.BLACK}
            fontSize={FontSize.MEDIUM}
            fontWeight={FontWeight.Regular}
          >
            {label}
          </Text>
        )}

        <select ref={ref} className={style.select} {...rest}>
          <option value="">Select an option</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {error && (
          <Text fontColor={Color.ERROR} fontSize={FontSize.SMALL}>
            {error}
          </Text>
        )}
      </div>
    );
  }
);

export default Dropdown;
