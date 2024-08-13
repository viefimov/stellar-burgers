import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from '../slices/IngredientsSlice';
import feedsReducer from '../slices/FeedsSlice';
import orderReducer from '../slices/OrderSlice';
import userReducer from '../slices/UserSlice';
import ordersReducer from '../slices/profileOrdersSlice';
import passwordResetReducer from '../slices/passwordSlice';
import { burgerConstructorReducer } from '../slices/ConstructorSlice';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  feeds: feedsReducer,
  order: orderReducer,
  user: userReducer,
  burgerConstructor: burgerConstructorReducer,
  orders: ordersReducer,
  passwordReset: passwordResetReducer
});
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
