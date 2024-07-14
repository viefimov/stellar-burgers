import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { AppDispatch, RootState } from '../../services/store';
import { fetchFeeds } from '../../slices/FeedsSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading, error } = useSelector(
    (state: RootState) => state.feeds
  );

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeeds())} />
  );
};
