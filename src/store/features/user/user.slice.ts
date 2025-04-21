import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import userService from "@/services/user.service"; 
import { IUser } from "@/interfaces/user.interface";

interface UserState {
  data: Record<number, IUser[]>; // page -> users
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: {},
  total: 0,
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  "users/fetch",
  async (
    {
      page,
      limit,
      query,
      role,
      status,
    }: { page: number; limit: number; query?: string; role?: string; status?: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await userService.getUsers({ page, limit, query, role });
      return { page, data: res?.metadata?.data, total: res.metadata.pagination.total };
    } catch (err: any) {
      console.log(err)
      return rejectWithValue(err?.response?.data?.message || "Fetch failed");
    }
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<{ page: number; data: IUser[]; total: number }>) => {
        const { page, data, total } = action.payload;
        console.log(action.payload)
        state.data[page] = data;
        state.total = total;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
