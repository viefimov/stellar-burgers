import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import ordersReducer, {
  getOrders,
  ProfileOrderssState
} from '../slices/profileOrdersSlice';
import { TOrder } from '../utils/types';
import { getOrdersApi } from '../utils/burger-api';

jest.mock('../utils/burger-api', () => ({
  getOrdersApi: jest.fn()
}));

describe('ordersSlice', () => {
  let store: EnhancedStore<{ orders: ProfileOrderssState }>;

  const initialState: ProfileOrderssState = {
    orders: [],
    loading: false,
    error: null
  };

  beforeAll(() => {
    store = configureStore({
      reducer: { orders: ordersReducer },
      devTools: process.env.NODE_ENV !== 'production'
    });
  });

  test('должен установить loading в true при вызове getOrders.pending', () => {
    store.dispatch({ type: getOrders.pending.type });

    const state = store.getState().orders;

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('должен установить данные и loading в false при вызове getOrders.fulfilled', () => {
    const order: TOrder = {
      _id: '1',
      status: 'Done',
      name: 'burger',
      createdAt: 'today',
      updatedAt: 'tomorrow',
      number: 5,
      ingredients: ['bun', 'meat', 'bun']
    };
    store.dispatch({
      type: getOrders.fulfilled.type,
      payload: order
    });

    const state = store.getState().orders;

    expect(state.loading).toBe(false);
  });

  test('должен установить ошибку и loading в false при вызове getOrders.rejected', () => {
    const errorMessage = 'Failed to fetch order';

    store.dispatch({
      type: getOrders.rejected.type,
      error: { message: errorMessage }
    });

    const state = store.getState().orders;

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
