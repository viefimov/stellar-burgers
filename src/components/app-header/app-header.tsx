import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { RootState, useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const { user, status } = useSelector((state: RootState) => state.user);
  return <AppHeaderUI userName={user?.name} />;
};
