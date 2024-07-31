import { rootReducer, RootState } from '../services/store';

describe('rootReducer', () => {
  const initialState: RootState = {
    ingredients: {
      items: [],
      loading: false,
      error: null,
      selectedIngredient: null
    },
    feeds: {
      orders: [],
      total: 0,
      totalToday: 0,
      loading: false,
      error: null
    },
    order: {
      currentOrder: null,
      loading: false,
      error: null,
      orderName: null
    },
    user: {
      user: null,
      status: 'idle',
      error: null,
      isAuthChecked: false
    },
    burgerConstructor: {
      bun: null,
      ingredients: []
    },
    orders: {
      orders: [],
      loading: false,
      error: null
    },
    passwordReset: {
      loading: false,
      error: undefined
    }
  };

  test('должен вернуть начальное состояние для всего хранилища при неизвестном действии', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(initialState);
  });

  test('должен вернуть начальное состояние для редюсера ingredients при неизвестном действии', () => {
    const { ingredients } = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(ingredients).toEqual(initialState.ingredients);
  });

  test('должен вернуть начальное состояние для редюсера feeds при неизвестном действии', () => {
    const { feeds } = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(feeds).toEqual(initialState.feeds);
  });

  test('должен вернуть начальное состояние для редюсера order при неизвестном действии', () => {
    const { order } = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(order).toEqual(initialState.order);
  });

  test('должен вернуть начальное состояние для редюсера user при неизвестном действии', () => {
    const { user } = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(user).toEqual(initialState.user);
  });

  test('должен вернуть начальное состояние для редюсера burgerConstructor при неизвестном действии', () => {
    const { burgerConstructor } = rootReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });
    expect(burgerConstructor).toEqual(initialState.burgerConstructor);
  });

  test('должен вернуть начальное состояние для редюсера orders при неизвестном действии', () => {
    const { orders } = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(orders).toEqual(initialState.orders);
  });

  test('должен вернуть начальное состояние для редюсера passwordReset при неизвестном действии', () => {
    const { passwordReset } = rootReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });
    expect(passwordReset).toEqual(initialState.passwordReset);
  });
});
