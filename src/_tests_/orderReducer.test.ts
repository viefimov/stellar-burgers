import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import orderReducer, {
  fetchOrderByNumber,
  postOrder,
  setCurrentOrder,
  clearCurrentOrder,
  clearData,
  OrderState
} from '../slices/OrderSlice';
import { TOrder } from '../utils/types';
import {
  getOrderByNumberApi,
  orderBurgerApi,
  TNewOrderResponse
} from '../utils/burger-api';

jest.mock('../utils/burger-api', () => ({
  getOrderByNumberApi: jest.fn(),
  orderBurgerApi: jest.fn()
}));

describe('orderSlice', () => {
  let store: EnhancedStore<{ order: OrderState }>;

  const initialState: OrderState = {
    currentOrder: null,
    loading: false,
    error: null,
    orderName: null
  };

  beforeAll(() => {
    store = configureStore({
      reducer: { order: orderReducer },
      devTools: process.env.NODE_ENV !== 'production'
    });
  });

  test('должен установить loading в true при вызове fetchOrderByNumber.pending', () => {
    store.dispatch({ type: fetchOrderByNumber.pending.type });

    const state = store.getState().order;

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('должен установить данные и loading в false при вызове fetchOrderByNumber.fulfilled', () => {
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
      type: fetchOrderByNumber.fulfilled.type,
      payload: order
    });

    const state = store.getState().order;

    expect(state.loading).toBe(false);
    expect(state.currentOrder).toEqual(order);
  });

  test('должен установить ошибку и loading в false при вызове fetchIngredients.rejected', () => {
    const errorMessage = 'Failed to fetch order';

    store.dispatch({
      type: fetchOrderByNumber.rejected.type,
      error: { message: errorMessage }
    });

    const state = store.getState().order;

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
  test('должен установить loading в true при вызове postOrder.pending', () => {
    store.dispatch({ type: postOrder.pending.type });

    const state = store.getState().order;

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('должен установить данные и loading в false при вызове postOrder.fulfilled', () => {
    const response: TNewOrderResponse = {
      success: true,
      order: {
        _id: '2',
        status: 'Done',
        name: 'burger',
        createdAt: 'today',
        updatedAt: 'tomorrow',
        number: 5,
        ingredients: ['bun', 'meat', 'bun']
      },
      name: 'burger'
    };
    store.dispatch({
      type: postOrder.fulfilled.type,
      payload: response
    });

    const state = store.getState().order;

    expect(state.loading).toBe(false);
    expect(state.currentOrder).toEqual(response.order);
    expect(state.orderName).toEqual(response.name);
  });

  test('должен установить ошибку и loading в false при вызове postOrder.rejected', () => {
    const errorMessage = 'Failed to fetch order';

    store.dispatch({
      type: postOrder.rejected.type,
      error: { message: errorMessage }
    });

    const state = store.getState().order;

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
  test('должен установить выбранный заказ при вызове setCurrentOrder', () => {
    const order: TOrder = {
      _id: '3',
      status: 'Done',
      name: 'burger',
      createdAt: 'today',
      updatedAt: 'tomorrow',
      number: 5,
      ingredients: ['bun', 'meat', 'bun']
    };
    store.dispatch(setCurrentOrder(order));

    const state = store.getState().order;

    expect(state.currentOrder).toEqual(order);
  });

  test('должен очистить заказ при вызове clearCurrentOrder', () => {
    store.dispatch(clearCurrentOrder());

    const state = store.getState().order;

    expect(state.currentOrder).toBe(null);
  });
  test('должен очистить данные при вызове clearData', () => {
    store.dispatch(clearData());

    const state = store.getState().order;

    expect(state).toEqual(initialState);
  });
});
