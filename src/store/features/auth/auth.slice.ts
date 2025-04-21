import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import authService from "@/services/auth.service"; // gọi API login
import { User } from "@/interfaces/user.interface";

interface AuthState {
  currentUser: User | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  currentUser: null,
  accessToken: null,
  loading: false,
  error: null,
};

// Gọi API login
export const login = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await authService.login({email, password});
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Lỗi đăng nhập");
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (
    _,
    { rejectWithValue }
  ) => {
    try {
      const response = await authService.logout();
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Logout error");
    }
  }
);



export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      setAccessToken: (state, action) => {
        state.accessToken = action.payload.accessToken
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(login.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.loading = false;
          state.currentUser = action.payload.metadata.user;
          state.accessToken = action.payload.metadata.tokens.accessToken;
        })
        .addCase(login.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })

        .addCase(logout.fulfilled, (state) => {
            state.currentUser = null;
            state.accessToken = null;
            state.error = null;
        })
    },
});

export const {setAccessToken} = authSlice.actions
export default authSlice.reducer;
