import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { forgotPasswordApi, resetPasswordApi } from '@api';

interface PasswordResetState {
  loading: boolean;
  error: string | undefined;
}

const initialState: PasswordResetState = {
  loading: false,
  error: undefined
};

export const forgotPassword = createAsyncThunk(
  'passwordReset/forgotPassword',
  async (email: string, thunkAPI) => {
    try {
      await forgotPasswordApi({ email });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'passwordReset/resetPassword',
  async (data: { password: string; token: string }, thunkAPI) => {
    try {
      await resetPasswordApi(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const passwordResetSlice = createSlice({
  name: 'passwordReset',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export default passwordResetSlice.reducer;
