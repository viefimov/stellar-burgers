import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import feedsReducer, { fetchFeeds, FeedsState } from '../slices/FeedsSlice';
import { TOrdersData } from '../utils/types';
import { getFeedsApi } from '../utils/burger-api';

jest.mock('../utils/burger-api', () => ({
  getFeedsApi: jest.fn()
}));

describe('feedsSlice', () => {
  let store: EnhancedStore<{ feeds: FeedsState }>;

  const initialState: FeedsState = {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: false,
    error: null
  };

  const feedsData: TOrdersData = {
    orders: [
      {
        _id: '1',
        ingredients: ['ingredient1', 'ingredient2'],
        status: 'done',
        name: 'Order 1',
        createdAt: '2023-07-29T12:34:56.789Z',
        updatedAt: '2023-07-29T12:34:56.789Z',
        number: 1
      },
      {
        _id: '2',
        ingredients: ['ingredient3', 'ingredient4'],
        status: 'pending',
        name: 'Order 2',
        createdAt: '2023-07-30T12:34:56.789Z',
        updatedAt: '2023-07-30T12:34:56.789Z',
        number: 2
      }
    ],
    total: 100,
    totalToday: 10
  };

  beforeAll(() => {
    store = configureStore({
      reducer: { feeds: feedsReducer },
      preloadedState: { feeds: initialState },
      devTools: process.env.NODE_ENV !== 'production'
    });
  });

  test('должен установить loading в true при вызове fetchFeeds.pending', () => {
    store.dispatch({ type: fetchFeeds.pending.type });

    const state = store.getState().feeds;

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('должен установить данные и loading в false при вызове fetchFeeds.fulfilled', () => {
    store.dispatch({
      type: fetchFeeds.fulfilled.type,
      payload: feedsData
    });

    const state = store.getState().feeds;

    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(feedsData.orders);
    expect(state.total).toBe(feedsData.total);
    expect(state.totalToday).toBe(feedsData.totalToday);
  });

  test('должен установить ошибку и loading в false при вызове fetchFeeds.rejected', () => {
    const errorMessage = 'Failed to fetch feeds';

    store.dispatch({
      type: fetchFeeds.rejected.type,
      error: { message: errorMessage }
    });

    const state = store.getState().feeds;

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
