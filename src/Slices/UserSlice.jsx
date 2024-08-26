import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
  user: null,
  userId: null,
  isAuthenticated: false,
  loginError: null,
  loggingIn: false,
  userHistory: [],
};

// API URL (backend endpoint)
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Async thunk for user registration
// Async thunk for user registration
export const registerUser = createAsyncThunk(
  "user/register",
  async ({ email, password, username }, { rejectWithValue }) => { // Add username here
    try {
      const response = await axios.post(
        `${apiUrl}/register`,
        { email, password, username }, // Include username in the request body
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response.data);
      return response.data; // Assuming backend sends back user data or success message
      
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);


// Async thunk for user login
export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiUrl}/login`,
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
        console.log(response.data);
      return response.data; // Expecting { userId: '...', firebaseUid: '...' }
  
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Redux slice
// Redux slice
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
        state.user = {
          userId: action.payload.userId,
          username: action.payload.displayName,
        }; // Store username
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
        state.user = { userId: action.payload.userId, username: action.payload.username }; // Store username
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loggingIn = false;
        state.loginError = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
