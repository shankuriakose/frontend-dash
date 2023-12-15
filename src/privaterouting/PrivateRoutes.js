import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoutes = () => {
  const { isAuthenticated, user } = useSelector(state => state.user);

  return (
    isAuthenticated && user !== null ? <Outlet /> : <Navigate to="/login" />
  );
};

export default PrivateRoutes;
