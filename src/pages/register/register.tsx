import React, { FC, SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser, registerUser } from '../../slices/UserSlice';
import { RegisterUI } from '@ui-pages';
import { useLocation, useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const location = useLocation();
  const from = location.state?.from || '/';
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await dispatch(
        registerUser({ email, name: userName, password })
      ).unwrap();

      await dispatch(loginUser({ email, password }));
      navigate(from);
    } catch (err) {
      setErrorText('Registration failed. Please try again.');
    }
  };

  return (
    <RegisterUI
      errorText={error || errorText}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
