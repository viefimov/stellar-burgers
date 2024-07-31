import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import passwordReserReducer, {
  forgotPassword,
  resetPassword,
  PasswordResetState
} from '../slices/passwordSlice';
import { forgotPasswordApi, resetPasswordApi } from '../utils/burger-api';

jest.mock('../utils/burger-api', () => ({
  forgotPasswordApi: jest.fn(),
  resetPasswordApi: jest.fn()
}));

describe('passwordSlice', () => {
  let store: EnhancedStore<{ password: PasswordResetState }>;

  const initialState: PasswordResetState = {
    loading: false,
    error: undefined
  };

  beforeAll(() => {
    store = configureStore({
      reducer: { password: passwordReserReducer },
      devTools: process.env.NODE_ENV !== 'production'
    });
  });

  test('должен установить loading в true при вызове forgotPassword.pending', () => {
    store.dispatch({ type: forgotPassword.pending.type });

    const state = store.getState().password;

    expect(state.loading).toBe(true);
    expect(state.error).toBe(undefined);
  });

  test('должен установить данные и loading в false при вызове forgotPassword.fulfilled', () => {
    store.dispatch({
      type: forgotPassword.fulfilled.type
    });

    const state = store.getState().password;

    expect(state.loading).toBe(false);
  });

  test('должен установить ошибку и loading в false при вызове forgotPassword.rejected', () => {
    const errorMessage = 'Failed to fetch order';

    store.dispatch({
      type: forgotPassword.rejected.type,
      payload: errorMessage
    });

    const state = store.getState().password;

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
  test('должен установить loading в true при вызове resetPassword.pending', () => {
    store.dispatch({ type: resetPassword.pending.type });

    const state = store.getState().password;

    expect(state.loading).toBe(true);
    expect(state.error).toBe(undefined);
  });

  test('должен установить данные и loading в false при вызове resetPassword.fulfilled', () => {
    store.dispatch({
      type: resetPassword.fulfilled.type
    });

    const state = store.getState().password;

    expect(state.loading).toBe(false);
  });

  test('должен установить ошибку и loading в false при вызове resetPassword.rejected', () => {
    const errorMessage = 'Failed to fetch order';

    store.dispatch({
      type: resetPassword.rejected.type,
      payload: errorMessage
    });

    const state = store.getState().password;

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
