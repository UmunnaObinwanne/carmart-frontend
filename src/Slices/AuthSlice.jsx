import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

// Create an axios instance with default config
const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

export const checkAuthStatus = createAsyncThunk(
  "auth/checkStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/auth-check");
      console.log('auth check', response)

      if (response.data.authenticated && response.data.userId) {
        return {
          authenticated: true,
          userId: response.data.userId,
          // If you add more user info on the server, you can include it here
        };
      } else {
        throw new Error("User is not authenticated or userId is missing");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Unauthorized, user is not authenticated
        return { authenticated: false, userId: null };
      }
      return rejectWithValue(error.message || "Auth check failed");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      await api.post("/logout");
      return { success: true };
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = action.payload.authenticated;
        state.userId = action.payload.userId;
        state.error = null;
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.isAuthenticated = false;
        state.userId = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.userId = null;
        state.status = "idle";
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
