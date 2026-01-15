import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";


export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/auth/me");
      return res.data.data;
    } catch (error) {
      return null;
    }
  }
);

const initialState = {
  user: null,
  isAuth: false,
  loading: true
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
      state.loading = false;
    },

    logout: (state) => {
      state.user = null;
      state.isAuth = false;
      state.loading = false;
    }
  },

  extraReducers: builder => {
    builder
      .addCase(loadUser.pending, state => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload;
          state.isAuth = true;
        } else {
          state.user = null;
          state.isAuth = false;
        }
        state.loading = false;
      })
      .addCase(loadUser.rejected, state => {
        state.user = null;
        state.isAuth = false;
        state.loading = false;
      });
  }
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
