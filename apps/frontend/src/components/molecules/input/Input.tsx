import Text from '../../atoms/text/Text';
import { Color } from '../../../enums/Color';
import style from './input.module.css';
import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, ...inputProps }, ref) => {
  return (
    <div className={style.inputWrapper}>
      {label && <Text fontColor={Color.BLACK}>{label}</Text>}
      <input
        className={style.inputField}
        ref={ref}
        {...inputProps}
      />
    </div>
  );
});

export default Input;
