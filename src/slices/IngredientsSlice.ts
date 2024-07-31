import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../utils/burger-api';
import { TIngredient } from '../utils/types';
export interface IngredientsState {
  items: TIngredient[];
  loading: boolean;
  error: string | null;
  selectedIngredient: TIngredient | null;
}

const initialState: IngredientsState = {
  items: [],
  loading: false,
  error: null,
  selectedIngredient: null
};

export const fetchIngredients = createAsyncThunk<TIngredient[], void>(
  'ingredients/fetchIngredients',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setSelectedIngredient(state, action: PayloadAction<TIngredient>) {
      state.selectedIngredient = action.payload;
    },
    clearSelectedIngredient(state) {
      state.selectedIngredient = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch ingredients';
      });
  }
});
export const { setSelectedIngredient, clearSelectedIngredient } =
  ingredientsSlice.actions;
export default ingredientsSlice.reducer;
