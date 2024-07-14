import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ProfileMenuUI } from '@ui';
import { AppDispatch } from '../../services/store';
import { logoutUser } from '../../slices/UserSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/login');
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
