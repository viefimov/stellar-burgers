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
import store, { useDispatch, useSelector } from '../../services/store';
import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';
import { Provider } from 'react-redux';
import { authCheck, fetchUser } from '../../slices/UserSlice';
import { Preloader } from '../ui/preloader';
import { getCookie } from '../../utils/cookie';
import ProtectedRoute from '../../services/protectedRoute';
import { ModalWithNavigation } from '../modal-nav/modalWithNav';
import { fetchIngredients } from '../../slices/IngredientsSlice';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state?.background;

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
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
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <ModalWithNavigation title='Информация о заказе'>
                <OrderInfo />
              </ModalWithNavigation>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <ModalWithNavigation title='Детали ингредиента'>
                <IngredientDetails />
              </ModalWithNavigation>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <ModalWithNavigation title='Информация о заказе'>
                  <OrderInfo />
                </ModalWithNavigation>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
