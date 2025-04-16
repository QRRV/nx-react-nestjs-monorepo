import { forwardRef, InputHTMLAttributes } from 'react';
import Text from '../../atoms/text/Text';
import style from './DatePicker.module.css';
import { Color } from '../../../enums/Color';
import { FontSize } from '../../../enums/FontSize';

interface DatePickerProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ label, error, ...rest }, ref) => {
    return (
      <div className={style.wrapper}>
        {label && (
          <Text fontColor={Color.BLACK} fontSize={FontSize.MEDIUM}>
      {label}
      </Text>
  )}
    <input type="date" className={style.input} ref={ref} {...rest} />
    {error && (
      <Text fontColor={Color.ERROR} fontSize={FontSize.SMALL}>
      {error}
      </Text>
    )}
    </div>
  );
  }
);

export default DatePicker;
