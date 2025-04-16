import { BrowserRouter, Routes, Route, useLocation, useNavigate, RouteObject } from 'react-router-dom';
import NavBar from '../components/organisms/navBar/NavBar';
import NavItem from '../components/molecules/navItem/NavItem';
import Button from '../components/atoms/button/Button';
import { RoutePath, routes } from '../routes';
import { getUserId, isAdmin, isLoggedIn, logout } from '../utils/auth';


const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const showNav = ![RoutePath.LOGIN, RoutePath.REGISTER].includes(location.pathname as RoutePath);

  const handleNavItemClick = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/register');
  };
  return (
    <>
      {showNav && isLoggedIn() && (
        <NavBar >
          <NavItem title="Home" isActive={location.pathname === RoutePath.HOME} onClick={() => handleNavItemClick(RoutePath.HOME)} />
          <NavItem title="About" isActive={location.pathname === RoutePath.ABOUT} onClick={() => handleNavItemClick(RoutePath.ABOUT)}/>
          <NavItem title="WatchList" isActive={location.pathname.includes('watchlist')} onClick={() => handleNavItemClick(`/users/${getUserId()}/watchlist`)}/>
          {isAdmin() &&
            <NavItem title="Admin Dashboard" isActive={location.pathname === RoutePath.ADMIN} onClick={() => handleNavItemClick(RoutePath.ADMIN)}/>
          }
          <NavItem title="Friends" isActive={location.pathname.includes('friends')} onClick={() => handleNavItemClick(`/users/${getUserId()}/friends`)}/>
          <NavItem title="Profile" isActive={location.pathname.startsWith(RoutePath.PRE_PROFILE)} onClick={() => handleNavItemClick(RoutePath.PRE_PROFILE)}/>
          <Button onClick={handleLogout}>Logout</Button>
        </NavBar>
      )}

      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </>
  );
};

export default App;
