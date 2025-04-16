import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Input from '../../molecules/input/Input';
import Text from '../../atoms/text/Text';
import Button from '../../atoms/button/Button';
import { FontWeight } from '../../../enums/FontWeight';
import { FontSize } from '../../../enums/FontSize';
import { Color } from '../../../enums/Color';
import { apiRequest } from '../../../utils/apiClient';
import style from './LoginPage.module.css';
import { useState } from 'react';

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginForm>({ mode: 'onChange' });

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await apiRequest('/auth/login', {
        method: 'POST',
        body: {
          email: data.email.toLowerCase(),
          password: data.password,
        },
      });

      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      setSubmitError(null);
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
      setSubmitError('Invalid email or password. Please try again.');
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Text
        fontWeight={FontWeight.ExtraBold}
        fontSize={FontSize.XLARGE}
        fontColor={Color.PRIMARY}
      >
        Login
      </Text>

      <Input
        label="E-mail"
        placeholder="email@email.nl"
        type="email"
        {...register('email', {
          required: true,
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        })}
      />
      {errors.email && (
        <Text fontColor={Color.ERROR} fontSize={FontSize.SMALL}>
          Invalid email, e.g. example@email.com
        </Text>
      )}

      <Input
        label="Password"
        placeholder="Example123!"
        type="password"
        {...register('password', {
          required: true,
          minLength: 8,
          pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
        })}
      />
      {errors.password && (
        <Text fontColor={Color.ERROR} fontSize={FontSize.SMALL}>
          Password must be 8+ chars, with upper/lowercase, number & symbol.
        </Text>
      )}

      <div onClick={() => navigate('/register')} className={style.redirectTextWrapper}>
        <Text fontColor={Color.GRAY} fontSize={FontSize.SMALL}>
          Don't have an account? Register
        </Text>
      </div>
      {submitError && (
        <Text fontColor={Color.ERROR} fontSize={FontSize.SMALL}>
          {submitError}
        </Text>
      )}

      <div className={style.submitButtonWrapper}>

        <Button type="submit" disabled={!isValid}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default LoginPage;
