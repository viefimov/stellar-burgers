import React, { ReactNode, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../services/store';
import { fetchUser, userSelectors } from '../slices/UserSlice';
import { getCookie } from '../utils/cookie';
import { Preloader } from '@ui';

interface ProtectedRouteProps {
  children: ReactNode;
  onUnAuth?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  onUnAuth = false
}) => {
  const location = useLocation();
  const from = location.state?.from || '/';
  const dispatch = useDispatch();
  const { getIsAuthChecked } = userSelectors;
  const { status } = useSelector((state) => state.user);
  const isAuthChecked = useSelector(getIsAuthChecked);
  useEffect(() => {
    if (!isAuthChecked) {
      dispatch(fetchUser());
    }
  }, [dispatch, isAuthChecked]);
  if (status == 'loading') {
    return <Preloader />;
  }
  if (!onUnAuth && !isAuthChecked) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (onUnAuth && isAuthChecked) {
    return <Navigate to={from} />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
