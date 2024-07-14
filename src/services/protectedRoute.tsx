import React, { ReactNode, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../services/store';
import { fetchUser, userSelectors } from '../slices/UserSlice';
import { getCookie } from '../utils/cookie';
import { Preloader } from '@ui';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { getIsAuthChecked, getUser } = userSelectors;
  const user = useSelector(getUser);
  const isAuthChecked = useSelector(getIsAuthChecked);
  useEffect(() => {
    const cookie = getCookie('token');
    if (cookie && !isAuthChecked) {
      dispatch(fetchUser());
    }
  }, [dispatch, isAuthChecked]);
  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!user) {
    return (
      <Navigate
        replace
        to={'/login'}
        state={{
          from: {
            ...location,
            backgroundLocation: location.state?.backgroundLocation,
            state: null
          }
        }}
      />
    );
  }

  return children;
};

export default ProtectedRoute;
