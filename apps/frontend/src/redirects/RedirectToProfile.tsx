
import { Navigate } from 'react-router-dom';
import { getUserId } from '../utils/auth';
import { RoutePath } from '../routes';

const RedirectToProfile = () => {
  const id = getUserId();

  return id
    ? <Navigate to={`/profile/${id}`} replace />
    : <Navigate to={RoutePath.REGISTER} replace />;
};

export default RedirectToProfile;
