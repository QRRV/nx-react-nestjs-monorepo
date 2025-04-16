import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Input from '../../molecules/input/Input';
import Text from '../../atoms/text/Text';
import Button from '../../atoms/button/Button';
import { FontWeight } from '../../../enums/FontWeight';
import { FontSize } from '../../../enums/FontSize';
import { Color } from '../../../enums/Color';
import { apiRequest } from '../../../utils/apiClient';
import style from './RegisterPage.module.css';
import { Role } from '../../../enums/Role';
import Dropdown from '../../molecules/dropdown/Dropdown';
import { useState } from 'react';

interface RegisterForm {
  email: string;
  password: string;
  username: string;
  bio: string;
  role: Role;
}

const RegisterPage = () => {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterForm>({
    mode: 'onChange',
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      const response = await apiRequest('/auth/register', {
        method: 'POST',
        body: {
          ...data,
          email: data.email.toLowerCase(),
        },
      });

      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setSubmitError(null);
      navigate('/');
    } catch (err) {
      console.error('Registration failed:', err);
      setSubmitError('Registration failed. Please try again.');
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Text
        fontWeight={FontWeight.ExtraBold}
        fontSize={FontSize.XLARGE}
        fontColor={Color.PRIMARY}
      >
        Register
      </Text>

      <Input
        label="E-mail"
        placeholder="email@email.com"
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

      <Input
        label="Username"
        placeholder="username"
        {...register('username', { required: true })}
      />
      {errors.username && (
        <Text fontColor={Color.ERROR} fontSize={FontSize.SMALL}>
          Username is required
        </Text>
      )}

      <Input
        label="Bio"
        placeholder="Tell us something about you"
        {...register('bio', { required: true })}
      />
      {errors.bio && (
        <Text fontColor={Color.ERROR} fontSize={FontSize.SMALL}>
          Bio is required
        </Text>
      )}

      <Dropdown
        label="Role"
        options={Object.values(Role).map((role) => ({ label: role, value: role }))}
        {...register('role', { required: 'Role is required' })}
        error={errors.role?.message}
      />

      <div onClick={() => navigate('/login')} className={style.redirectTextWrapper}>
        <Text fontColor={Color.GRAY} fontSize={FontSize.SMALL}>
          Already have an account? Login
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

export default RegisterPage;
