import style from './Checkbox.module.css';
import { InputHTMLAttributes, forwardRef } from 'react';
import Text from '../../atoms/text/Text';
import { FontSize } from '../../../enums/FontSize';
import { FontWeight } from '../../../enums/FontWeight';
import { Color } from '../../../enums/Color';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, ...rest }, ref) => {
    return (
      <div className={style.wrapper}>
        <label className={style.label}>
          <input type="checkbox" ref={ref} {...rest} />
          {label && (
            <Text
              fontSize={FontSize.MEDIUM}
              fontWeight={FontWeight.Regular}
              fontColor={Color.BLACK}
            >
              {label}
            </Text>
          )}
        </label>
        {error && (
          <Text fontColor={Color.ERROR} fontSize={FontSize.SMALL}>
            {error}
          </Text>
        )}
      </div>
    );
  }
);

export default Checkbox;
