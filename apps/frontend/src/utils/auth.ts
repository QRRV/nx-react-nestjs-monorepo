import { useNavigate } from 'react-router-dom';

export const isLoggedIn = () => {
  return !!localStorage.getItem('token');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const isAdmin = () => {
  const user = getCurrentUser();
  return user && user.role === 'admin';
}

export const getUserId = () => {
  const user = getCurrentUser();
  return user ? user.id : null;
}
