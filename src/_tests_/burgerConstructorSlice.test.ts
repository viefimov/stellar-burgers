import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import {
  burgerConstructorReducer,
  addIngredients,
  removeIngredients,
  changeIngredientsOrder,
  IConstructorState,
  clearIngredients
} from '../slices/ConstructorSlice';
import { TIngredient } from '@utils-types';

jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('test-uuid')
}));
describe('burgerConstructorReducer', () => {
  let store: EnhancedStore<{ burgerConstructor: IConstructorState }>;
  const initialState: IConstructorState = {
    bun: null,
    ingredients: []
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
  const ingredient3: TIngredient = {
    _id: '3',
    name: 'Помидор',
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
      reducer: { burgerConstructor: burgerConstructorReducer },
      preloadedState: { burgerConstructor: initialState },
      devTools: process.env.NODE_ENV !== 'production'
    });
  });

  test('должен обрабатывать добавление двух ингредиентов и булки', () => {
    store.dispatch(addIngredients(ingredient1));
    store.dispatch(addIngredients(ingredient2));
    store.dispatch(addIngredients(ingredient3));
    const state = store.getState().burgerConstructor;

    expect(state.bun).toEqual({ ...ingredient1, id: 'test-uuid' });
    expect(state.ingredients).toHaveLength(2);
    expect(state.ingredients[0]).toEqual({ ...ingredient2, id: 'test-uuid' });
    expect(state.bun?.name).toBe('Булка');
  });

  test('должен обрабатывать изменение порядка ингредиентов', () => {
    store.dispatch(
      changeIngredientsOrder({
        initialIndex: 0,
        finishIndex: 1
      })
    );
    const state = store.getState().burgerConstructor;
    expect(state.ingredients).toHaveLength(2);
    expect(state.ingredients[0]._id).toBe('3');
    expect(state.ingredients[1]._id).toBe('2');
  });

  test('должен обрабатывать удаление ингредиента', () => {
    store.dispatch(removeIngredients('test-uuid'));

    const state = store.getState().burgerConstructor;

    expect(state.ingredients).toHaveLength(0);
  });
  test('должен обрабатывать очищение всех ингредиетов', () => {
    store.dispatch(addIngredients(ingredient2));
    store.dispatch(clearIngredients());

    const state = store.getState().burgerConstructor;

    expect(state).toEqual(initialState);
  });
});
