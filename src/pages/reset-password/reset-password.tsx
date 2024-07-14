// components/ResetPassword.tsx
import React, { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../../slices/passwordSlice';
import { AppDispatch, RootState } from '../../services/store';
import { ResetPasswordUI } from '@ui-pages';

export const ResetPassword: FC = () => {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector(
    (state: RootState) => state.passwordReset
  );

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(resetPassword({ password, token })).then(() => {
      navigate('/login');
    });
  };

  useEffect(() => {
    if (!localStorage.getItem('resetPassword')) {
      navigate('/forgot-password', { replace: true });
    }
  }, [navigate]);

  return (
    <ResetPasswordUI
      errorText={error}
      password={password}
      token={token}
      setPassword={setPassword}
      setToken={setToken}
      handleSubmit={handleSubmit}
    />
  );
};
