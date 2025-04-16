import style from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'danger';
}

const Button = ({ children, onClick, disabled, type = 'button', variant = 'primary' }: ButtonProps) => {
  const classNames = [style.button];
  if (variant === 'danger') {
    classNames.push(style.danger);
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames.join(' ')}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
