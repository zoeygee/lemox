import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
// hooks
// import useAuth from '../hooks/useAuth';
// routes
import { PATH_DASHBOARD } from '../routes/paths';

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default function GuestGuard({ children }) {
  const user = JSON.parse(localStorage.getItem('profile'));
  const isAuthenticated = user;
  const location = useLocation();

  if (isAuthenticated) {
    return <Navigate to={PATH_DASHBOARD.root} replace state={{ from: location }} />;
  }

  return <>{children}</>;
}
