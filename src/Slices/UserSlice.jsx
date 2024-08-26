import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  userId: null,
  isAuthenticated: false,
  loginError: null,
  loggingIn: false,
  userHistory: [],
};

const apiUrl = import.meta.env.VITE_API_URL;
console.log("API URL:", apiUrl);

export const registerUser = createAsyncThunk(
  "user/register",
  async (
    { username, email, password, confirmPassword },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${apiUrl}/register`,
        { username, email, password, confirmPassword },
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Registration failed"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiUrl}/login`,
        { username, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Login failed");
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.userId = null;
      state.user = null;
      state.userHistory = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loggingIn = true;
        state.loginError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loggingIn = false;
        state.isAuthenticated = true;
        state.userId = action.payload.userId;
        state.user = { userId: action.payload.userId };
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loggingIn = false;
        state.loginError = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loggingIn = true;
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loggingIn = false;
        state.isAuthenticated = true;
        state.userId = action.payload.userId;
        state.user = { userId: action.payload.userId };
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loggingIn = false;
        state.loginError = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
