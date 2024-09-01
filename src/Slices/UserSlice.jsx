import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  userId: null,
  isAuthenticated: false,
  loginError: null,
  loggingIn: false,
  loading: false,
  userHistory: [],
};

const apiUrl = import.meta.env.VITE_API_URL;
console.log(apiUrl);

// Create an axios instance with default config
const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // This is important for sending and receiving cookies
});

export const registerUser = createAsyncThunk(
  "user/register",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/register", {
        username,
        email,
        password,
      });
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
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/login", { email, password });
      console.log(response.data);
      // The token should be set as an HttpOnly cookie by the server
      // We don't need to manually handle it here
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
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
        state.registering = true;
        state.registrationError = null;
        state.registrationSuccess = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registering = false;
        state.registrationSuccess = true;
        state.userId = action.payload.userId;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registering = false;
        state.registrationError = action.payload;
        state.registrationSuccess = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loggingIn = true;
        state.loginError = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loggingIn = false;
        state.loginError = null;
        state.isAuthenticated = true;
        state.userId = action.payload.userId;
        state.user = { userId: action.payload.userId };
        state.token = action.payload.token; // Store JWT token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loggingIn = false;
        state.loginError = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
