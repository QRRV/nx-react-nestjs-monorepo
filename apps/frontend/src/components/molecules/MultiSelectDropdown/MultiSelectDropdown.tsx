import style from './MultiSelectDropdown.module.css';
import { forwardRef, SelectHTMLAttributes } from 'react';
import Text from '../../atoms/text/Text';
import { Color } from '../../../enums/Color';
import { FontSize } from '../../../enums/FontSize';
import { FontWeight } from '../../../enums/FontWeight';

interface MultiSelectDropdownProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'multiple'> {
  options: { value: string; label: string }[];
  label?: string;
  error?: string;
}

const MultiSelectDropdown = forwardRef<HTMLSelectElement, MultiSelectDropdownProps>(
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

        <select ref={ref} multiple className={style.select} {...rest}>
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

export default MultiSelectDropdown;
