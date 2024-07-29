import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getOrderByNumberApi,
  orderBurgerApi,
  TNewOrderResponse
} from '../utils/burger-api';
import { TOrder } from '../utils/types';
import { RootState } from '../services/store';

interface OrderState {
  currentOrder: TOrder | null;
  loading: boolean;
  error: string | null;
  orderName: string | null;
}

const initialState: OrderState = {
  currentOrder: null,
  loading: false,
  error: null,
  orderName: null
};

export const fetchOrderByNumber = createAsyncThunk<TOrder, number>(
  'order/fetchOrderByNumber',
  async (orderNumber) => {
    const response = await getOrderByNumberApi(orderNumber);
    return response.orders[0];
  }
);

export const postOrder = createAsyncThunk<TNewOrderResponse, string[]>(
  'order/createOrder',
  async (ingredients) => {
    const response = await orderBurgerApi(ingredients);
    return response;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setCurrentOrder(state, action: PayloadAction<TOrder>) {
      state.currentOrder = action.payload;
    },
    clearCurrentOrder(state) {
      state.currentOrder = null;
    },
    clearData(state) {
      state.currentOrder = null;
      state.loading = false;
      state.error = null;
      state.orderName = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch order';
      })
      .addCase(postOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload.order;
        state.orderName = action.payload.name;
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create order';
      });
  }
});

export const { setCurrentOrder, clearCurrentOrder, clearData } =
  orderSlice.actions;
export const getOrder = (state: RootState) => state.order.currentOrder;
export const getOrderLoading = (state: RootState) => state.order.loading;
export default orderSlice.reducer;
