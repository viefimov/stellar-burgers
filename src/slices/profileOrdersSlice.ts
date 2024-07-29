import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrdersApi } from '../utils/burger-api';
import { TOrder } from '@utils-types';

interface ProfileOrderssState {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
}

const initialState: ProfileOrderssState = {
  orders: [],
  loading: false,
  error: null
};

export const getOrders = createAsyncThunk<TOrder[]>(
  'orders/getOrders',
  async () => {
    const response = await getOrdersApi();
    return response;
  }
);
const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to get orders';
      });
  }
});

export default ordersSlice.reducer;
