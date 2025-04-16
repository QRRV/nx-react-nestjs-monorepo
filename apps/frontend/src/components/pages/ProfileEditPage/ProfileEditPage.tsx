import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiRequest } from '../../../utils/apiClient';
import { User } from '../../../entities/User';
import Input from '../../molecules/input/Input';
import Text from '../../atoms/text/Text';
import Button from '../../atoms/button/Button';
import { FontWeight } from '../../../enums/FontWeight';
import { FontSize } from '../../../enums/FontSize';
import { Color } from '../../../enums/Color';
import { RoutePath } from '../../../routes';
import { getUserId } from '../../../utils/auth';

interface ProfileForm {
  username: string;
  password: string;
  bio: string;
}

const ProfileEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<ProfileForm>({ mode: 'onChange' });

  useEffect(() => {
    if (getUserId() !== id) {
      navigate(RoutePath.REGISTER);
    }

  }, [id]);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token || getUserId() !== id) {
          navigate(RoutePath.REGISTER);
          return;
        }
        const response = await apiRequest(`/users/${id}`, {
          method: 'GET',
          authToken: token || '',
        });

        const user: User = response.data;
        setValue('username', user.username);
        setValue('bio', user.bio);
      } catch (err) {
        console.error('Failed to load user profile:', err);
      }
    };

    fetchUser();
  }, [id, setValue]);

  const onSubmit = async (data: ProfileForm) => {
    try {
      const token = localStorage.getItem('token');
      await apiRequest(`/users/${id}`, {
        method: 'PATCH',
        body: data,
        authToken: token || '',
      });

      setSubmitError(null); // clear previous errors
      navigate(`${RoutePath.PROFILE.replace(':id', id || '')}`);
    } catch (err) {
      console.error('Failed to update profile:', err);
      setSubmitError('Failed to update profile. Please try again.');
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Text fontSize={FontSize.XLARGE} fontWeight={FontWeight.ExtraBold} fontColor={Color.PRIMARY}>
        Edit Profile
      </Text>

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
        label="Password"
        placeholder="New password"
        type="password"
        {...register('password', {
          required: true,
          minLength: 8,
          pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
        })}
      />
      {errors.password && (
        <Text fontColor={Color.ERROR} fontSize={FontSize.SMALL}>
          Password must be strong (8+ chars, upper/lowercase, number, symbol)
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

      <div style={{ marginTop: '1rem' }}>
        {submitError && (
          <Text fontColor={Color.ERROR} fontSize={FontSize.SMALL}>
            {submitError}
          </Text>
        )}

        <Button type="submit" disabled={!isValid}>
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default ProfileEditPage;
