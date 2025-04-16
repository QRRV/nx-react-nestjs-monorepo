import { Navigate, RouteObject } from 'react-router-dom';

import LandingPage from './components/pages/landingPage/LandingPage';
import AboutPage from './components/pages/AboutPage/AboutPage';
import RegisterPage from './components/pages/RegisterPage/RegisterPage';
import LoginPage from './components/pages/LoginPage/LoginPage';
import { isAdmin, isLoggedIn } from './utils/auth';
import MovieDetailPage from './components/pages/movieDetailPage/MovieDetailPage';
import AdminPage from './components/pages/AdminPage/AdminPage';
import ProfilePage from './components/pages/ProfilePage/ProfilePage';
import ProfileEditPage from './components/pages/ProfileEditPage/ProfileEditPage';
import RedirectToProfile from './redirects/RedirectToProfile';
import MovieCreatePage from './components/pages/movieCreatePage/MovieCreatePage';
import MovieEditPage from './components/pages/MovieEditPage/MovieEditPage';
import CreateReviewPage from './components/pages/CreateReviewPage/CreateReviewPage';
import ReviewEditPage from './components/pages/ReviewEditPage/ReviewEditPage';
import ReviewDetailPage from './components/pages/ReviewDetailPage/ReviewDetailPage';
import WatchListDetailPage from './components/pages/WatchListDetailPage/WatchListDetailPage';
import WatchListItemCreatePage from './components/pages/WatchListItemCreatePage/WatchListItemCreatePage';
import WatchListItemEditPage from './components/pages/WatchListItemEditPage/WatchListItemEditPage';
import FriendsPage from './components/pages/FriendsPage/FriendsPage';
import WatchListItemDetailPage from './components/pages/WatchListItemDetailPage/WatchListItemDetailPage';
export type AppRoute = RouteObject & {
  path: string;
  element: JSX.Element;
};
export enum RoutePath {
  HOME = '/',
  REGISTER = '/register',
  LOGIN = '/login',
  ABOUT = '/about',
  MOVIE = '/movie/:id',
  ADMIN = '/admin',
  PRE_PROFILE = '/profile',
  PROFILE = '/profile/:id',
  PROFILE_EDIT = '/profile/:id/edit',
  MOVIE_EDIT = '/movie/:id/edit',
  MOVIE_CREATE = '/movie/create',
  REVIEW_CREATE = '/movie/:movieId/review',
  REVIEW_EDIT = '/movie/:movieId/review/:reviewId/edit',
  REVIEW = '/movie/:movieId/review/:reviewId',
  WATCHLIST = '/users/:userId/watchlist',
  WATCHLIST_CREATE = '/users/:userId/watchlist/create',
  WATCHLIST_CREATE_FOR_MOVIE = '/users/:userId/watchlist/create/:movieId',
  WATCHLIST_EDIT = '/users/:userId/watchlist/:itemId/edit',
  WATCHLIST_ITEM = '/users/:userId/watchlist/:itemId',
  FRIENDS = '/users/:userId/friends',
}


const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  return isLoggedIn() ? children : <Navigate to={RoutePath.REGISTER} />;
};

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  return isLoggedIn() && isAdmin()
    ? children
    : <Navigate to={RoutePath.HOME} />;
};


export const routes: AppRoute[] = [
  { path: RoutePath.REGISTER, element: <RegisterPage /> },
  { path: RoutePath.LOGIN, element: <LoginPage /> },


  {
    path: RoutePath.PRE_PROFILE,
    element: <RedirectToProfile />,
  },
  {
    path: RoutePath.HOME,
    element: (
      <PrivateRoute>
        <LandingPage />
      </PrivateRoute>
    ),
  },
  {
    path: RoutePath.ABOUT,
    element: (
      <PrivateRoute>
        <AboutPage />
      </PrivateRoute>
    ),
  },
  {
    path: RoutePath.MOVIE,
    element: (
      <PrivateRoute>
        <MovieDetailPage />
      </PrivateRoute>
    ),
  },
  {
    path: RoutePath.PROFILE,
    element: (
      <PrivateRoute>
        <ProfilePage />
      </PrivateRoute>
    ),
  },
  {
    path: RoutePath.PROFILE_EDIT,
    element: (
      <PrivateRoute>
        <ProfileEditPage />
      </PrivateRoute>
    ),
  },
  {
    path: RoutePath.REVIEW_CREATE,
    element: (
      <PrivateRoute>
        <CreateReviewPage />
      </PrivateRoute>
    ),
  },
  {
    path: RoutePath.REVIEW_EDIT,
    element: (
      <PrivateRoute>
        <ReviewEditPage />
      </PrivateRoute>
    ),
  },
  {
    path: RoutePath.REVIEW,
    element: (
      <PrivateRoute>
        <ReviewDetailPage />
      </PrivateRoute>
    ),
  },
  {
    path: RoutePath.WATCHLIST,
    element: (
      <PrivateRoute>
        <WatchListDetailPage />
      </PrivateRoute>
    ),
  },
  {
    path: RoutePath.WATCHLIST_CREATE,
    element: (
      <PrivateRoute>
        <WatchListItemCreatePage />
      </PrivateRoute>
    ),
  },
  {
    path: RoutePath.WATCHLIST_CREATE_FOR_MOVIE,
    element: (
      <PrivateRoute>
        <WatchListItemCreatePage />
      </PrivateRoute>
    ),
  },
  {
    path: RoutePath.WATCHLIST_EDIT,
    element: (
      <PrivateRoute>
        <WatchListItemEditPage />
      </PrivateRoute>
    ),
  },
  {
    path: RoutePath.WATCHLIST_ITEM,
    element: (
      <PrivateRoute>
        <WatchListItemDetailPage />
      </PrivateRoute>
    ),
  },
  {
    path: RoutePath.FRIENDS,
    element: (
      <PrivateRoute>
        <FriendsPage />
      </PrivateRoute>
    ),
  },
  {
    path: RoutePath.ADMIN,
    element: (
      <AdminRoute>
        <AdminPage />
      </AdminRoute>
    ),
  },
  {
    path: RoutePath.MOVIE_CREATE,
    element: (
      <AdminRoute>
        <MovieCreatePage />
      </AdminRoute>
    ),
  },
  {
    path: RoutePath.MOVIE_EDIT,
    element: (
      <AdminRoute>
        <MovieEditPage />
      </AdminRoute>
    ),
  },
  {
    path: '*',
    element: isLoggedIn()
      ? <Navigate to={RoutePath.HOME} />
      : <Navigate to={RoutePath.REGISTER} />,
  },

];
