import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import ingredientsReducer, {
  fetchIngredients,
  setSelectedIngredient,
  clearSelectedIngredient,
  IngredientsState
} from '../slices/IngredientsSlice';
import { TIngredient } from '../utils/types';
import { getIngredientsApi } from '../utils/burger-api';

jest.mock('../utils/burger-api', () => ({
  getIngredientsApi: jest.fn()
}));

describe('ingredientsSlice', () => {
  let store: EnhancedStore<{ ingredients: IngredientsState }>;

  const initialState: IngredientsState = {
    items: [],
    loading: false,
    error: null,
    selectedIngredient: null
  };

  const ingredient1: TIngredient = {
    _id: '1',
    name: 'Булка',
    type: 'bun',
    proteins: 10,
    fat: 20,
    carbohydrates: 30,
    calories: 40,
    price: 50,
    image: 'image-url',
    image_mobile: 'image-mobile-url',
    image_large: 'image-large-url'
  };

  const ingredient2: TIngredient = {
    _id: '2',
    name: 'Лист салата',
    type: 'main',
    proteins: 1,
    fat: 0,
    carbohydrates: 1,
    calories: 5,
    price: 10,
    image: 'image-url',
    image_mobile: 'image-mobile-url',
    image_large: 'image-large-url'
  };

  beforeAll(() => {
    store = configureStore({
      reducer: { ingredients: ingredientsReducer },
      preloadedState: { ingredients: initialState },
      devTools: process.env.NODE_ENV !== 'production'
    });
  });

  test('должен установить loading в true при вызове fetchIngredients.pending', () => {
    store.dispatch({ type: fetchIngredients.pending.type });

    const state = store.getState().ingredients;

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('должен установить данные и loading в false при вызове fetchIngredients.fulfilled', () => {
    const ingredients: TIngredient[] = [ingredient1, ingredient2];

    store.dispatch({
      type: fetchIngredients.fulfilled.type,
      payload: ingredients
    });

    const state = store.getState().ingredients;

    expect(state.loading).toBe(false);
    expect(state.items).toEqual(ingredients);
  });

  test('должен установить ошибку и loading в false при вызове fetchIngredients.rejected', () => {
    const errorMessage = 'Failed to fetch ingredients';

    store.dispatch({
      type: fetchIngredients.rejected.type,
      error: { message: errorMessage }
    });

    const state = store.getState().ingredients;

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  test('должен установить выбранный ингредиент при вызове setSelectedIngredient', () => {
    store.dispatch(setSelectedIngredient(ingredient1));

    const state = store.getState().ingredients;

    expect(state.selectedIngredient).toEqual(ingredient1);
  });

  test('должен очистить выбранный ингредиент при вызове clearSelectedIngredient', () => {
    store.dispatch(clearSelectedIngredient());

    const state = store.getState().ingredients;

    expect(state.selectedIngredient).toBe(null);
  });
});
