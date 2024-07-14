import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import React, { ReactNode, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation
} from 'react-router-dom';
import '../../index.css';
import styles from './app.module.css';
import store, { AppDispatch, RootState } from '../../services/store';
import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { authCheck, fetchUser } from '../../slices/UserSlice';
import { Preloader } from '../ui/preloader';
import { getCookie } from '../../utils/cookie';
import ProtectedRoute from '../../services/protectedRoute';
import { ModalWithNavigation } from '../modal-nav/modalWithNav';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUser())
      .unwrap()
      .finally(() => dispatch(authCheck()));
  }, [authCheck]);

  return (
    <Router>
      <div className={styles.app}>
        <AppHeader />
        <Routes>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile/orders'
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <ModalWithNavigation title='Order Info'>
                <OrderInfo />
              </ModalWithNavigation>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <ModalWithNavigation title='Ingredient Details'>
                <IngredientDetails />
              </ModalWithNavigation>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <ModalWithNavigation title='Order Info'>
                  <OrderInfo />
                </ModalWithNavigation>
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<NotFound404 />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
