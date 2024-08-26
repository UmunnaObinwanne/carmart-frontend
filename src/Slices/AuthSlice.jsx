import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

// Thunk to check authentication status
export const checkAuthStatus = createAsyncThunk(
  "auth/checkStatus",
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/auth-check`, {
        withCredentials: true,
      });

      const { authenticated } = response.data;
      const state = getState();
      const currentUserId = state.auth.userId;

      if (authenticated) {
        return { authenticated, userId: currentUserId };
      } else {
        throw new Error("User is not authenticated");
      }
    } catch (error) {
      return rejectWithValue(error.message || "Auth check failed");
    }
  }
);

// Handle Logout
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(
        `${apiUrl}/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      return {}; // No need to return anything specific
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Logout failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    status: "idle",
    error: null,
    userId: null,
  },
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.userId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = action.payload.authenticated;
        state.userId = action.payload.userId;
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.isAuthenticated = false;
        state.userId = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.userId = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
