import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import userReducer, {
  loginUser,
  registerUser,
  fetchUser,
  resetPassword,
  forgotPassword,
  updateUser,
  logoutUser,
  UserState,
  logout,
  authCheck
} from '../slices/UserSlice';
import { TUser } from '@utils-types';
import { TAuthResponse } from '@api';
import {
  loginUserApi,
  registerUserApi,
  getUserApi,
  resetPasswordApi,
  forgotPasswordApi,
  updateUserApi,
  logoutApi
} from '@api';

jest.mock('@api', () => ({
  loginUserApi: jest.fn(),
  registerUserApi: jest.fn(),
  getUserApi: jest.fn(),
  resetPasswordApi: jest.fn(),
  forgotPasswordApi: jest.fn(),
  updateUserApi: jest.fn(),
  logoutApi: jest.fn()
}));

describe('userSlice', () => {
  let store: EnhancedStore<{ user: UserState }>;

  const initialState: UserState = {
    user: null,
    status: 'idle',
    error: null,
    isAuthChecked: false
  };

  const user: TUser = {
    email: 'test@test.com',
    name: 'Test User'
  };

  const authResponse: TAuthResponse = {
    accessToken: 'testAccessToken',
    refreshToken: 'testRefreshToken',
    user,
    success: true
  };

  beforeAll(() => {
    store = configureStore({
      reducer: { user: userReducer },
      preloadedState: { user: initialState },
      devTools: process.env.NODE_ENV !== 'production'
    });
  });

  test('должен установить статус в loading при вызове loginUser.pending', () => {
    store.dispatch({ type: loginUser.pending.type });

    const state = store.getState().user;

    expect(state.status).toBe('loading');
  });

  test('должен установить пользователя и статус в succeeded при вызове loginUser.fulfilled', () => {
    store.dispatch({
      type: loginUser.fulfilled.type,
      payload: user
    });

    const state = store.getState().user;

    expect(state.status).toBe('succeeded');
    expect(state.user).toEqual(user);
    expect(state.isAuthChecked).toBe(true);
  });

  test('должен установить ошибку и статус в failed при вызове loginUser.rejected', () => {
    const errorMessage = 'Failed to login';

    store.dispatch({
      type: loginUser.rejected.type,
      error: { message: errorMessage }
    });

    const state = store.getState().user;

    expect(state.status).toBe('failed');
    expect(state.error).toBe(errorMessage);
  });

  test('должен установить статус в loading при вызове registerUser.pending', () => {
    store.dispatch({ type: registerUser.pending.type });

    const state = store.getState().user;

    expect(state.status).toBe('loading');
  });

  test('должен установить пользователя и статус в succeeded при вызове registerUser.fulfilled', () => {
    store.dispatch({
      type: registerUser.fulfilled.type,
      payload: user
    });

    const state = store.getState().user;

    expect(state.status).toBe('succeeded');
    expect(state.user).toEqual(user);
    expect(state.isAuthChecked).toBe(true);
  });

  test('должен установить ошибку и статус в failed при вызове registerUser.rejected', () => {
    const errorMessage = 'Failed to register';

    store.dispatch({
      type: registerUser.rejected.type,
      error: { message: errorMessage }
    });

    const state = store.getState().user;

    expect(state.status).toBe('failed');
    expect(state.error).toBe(errorMessage);
  });

  test('должен установить статус в loading при вызове fetchUser.pending', () => {
    store.dispatch({ type: fetchUser.pending.type });

    const state = store.getState().user;

    expect(state.status).toBe('loading');
  });

  test('должен установить пользователя и статус в succeeded при вызове fetchUser.fulfilled', () => {
    store.dispatch({
      type: fetchUser.fulfilled.type,
      payload: user
    });

    const state = store.getState().user;

    expect(state.status).toBe('succeeded');
    expect(state.user).toEqual(user);
    expect(state.isAuthChecked).toBe(true);
  });

  test('должен установить ошибку и статус в failed при вызове fetchUser.rejected', () => {
    const errorMessage = 'Failed to fetch user';

    store.dispatch({
      type: fetchUser.rejected.type,
      error: { message: errorMessage }
    });

    const state = store.getState().user;

    expect(state.status).toBe('failed');
    expect(state.error).toBe(errorMessage);
    expect(state.isAuthChecked).toBe(false);
  });

  test('должен установить статус в loading при вызове resetPassword.pending', () => {
    store.dispatch({ type: resetPassword.pending.type });

    const state = store.getState().user;

    expect(state.status).toBe('loading');
  });

  test('должен установить статус в succeeded при вызове resetPassword.fulfilled', () => {
    store.dispatch({
      type: resetPassword.fulfilled.type
    });

    const state = store.getState().user;

    expect(state.status).toBe('succeeded');
  });

  test('должен установить ошибку и статус в failed при вызове resetPassword.rejected', () => {
    const errorMessage = 'Failed to reset password';

    store.dispatch({
      type: resetPassword.rejected.type,
      error: { message: errorMessage }
    });

    const state = store.getState().user;

    expect(state.status).toBe('failed');
    expect(state.error).toBe(errorMessage);
  });

  test('должен установить статус в loading при вызове forgotPassword.pending', () => {
    store.dispatch({ type: forgotPassword.pending.type });

    const state = store.getState().user;

    expect(state.status).toBe('loading');
  });

  test('должен установить статус в succeeded при вызове forgotPassword.fulfilled', () => {
    store.dispatch({
      type: forgotPassword.fulfilled.type
    });

    const state = store.getState().user;

    expect(state.status).toBe('succeeded');
  });

  test('должен установить ошибку и статус в failed при вызове forgotPassword.rejected', () => {
    const errorMessage = 'Failed to request password reset';

    store.dispatch({
      type: forgotPassword.rejected.type,
      error: { message: errorMessage }
    });

    const state = store.getState().user;

    expect(state.status).toBe('failed');
    expect(state.error).toBe(errorMessage);
  });

  test('должен установить статус в loading при вызове updateUser.pending', () => {
    store.dispatch({ type: updateUser.pending.type });

    const state = store.getState().user;

    expect(state.status).toBe('loading');
  });

  test('должен установить пользователя и статус в succeeded при вызове updateUser.fulfilled', () => {
    store.dispatch({
      type: updateUser.fulfilled.type,
      payload: user
    });

    const state = store.getState().user;

    expect(state.status).toBe('succeeded');
    expect(state.user).toEqual(user);
  });

  test('должен установить ошибку и статус в failed при вызове updateUser.rejected', () => {
    const errorMessage = 'Failed to update user';

    store.dispatch({
      type: updateUser.rejected.type,
      error: { message: errorMessage }
    });

    const state = store.getState().user;

    expect(state.status).toBe('failed');
    expect(state.error).toBe(errorMessage);
  });

  test('должен установить статус в loading при вызове logoutUser.pending', () => {
    store.dispatch({ type: logoutUser.pending.type });

    const state = store.getState().user;

    expect(state.status).toBe('loading');
  });

  test('должен установить пользователя в null и статус в succeeded при вызове logoutUser.fulfilled', () => {
    store.dispatch({
      type: logoutUser.fulfilled.type
    });

    const state = store.getState().user;

    expect(state.status).toBe('succeeded');
    expect(state.user).toBe(null);
    expect(state.isAuthChecked).toBe(false);
  });

  test('должен установить ошибку и статус в failed при вызове logoutUser.rejected', () => {
    const errorMessage = 'Failed to logout';

    store.dispatch({
      type: logoutUser.rejected.type,
      error: { message: errorMessage }
    });

    const state = store.getState().user;

    expect(state.status).toBe('failed');
    expect(state.error).toBe(errorMessage);
  });

  test('должен установить isAuthChecked в true при вызове authCheck', () => {
    store.dispatch(authCheck());

    const state = store.getState().user;

    expect(state.isAuthChecked).toBe(true);
  });

  test('должен очистить пользователя и установить начальное состояние при вызове logout', () => {
    store.dispatch(logout());

    const state = store.getState().user;

    expect(state).toEqual(initialState);
  });
});
