import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define initial state
const initialState = {
  user: null,
  userId: null, // Store userId separately
  token: null, // Store JWT token
  isAuthenticated: false,
  loginError: null,
  loggingIn: false,
  loading: false,
  userHistory: [], // New state to hold user history
};

const apiUrl = import.meta.env.VITE_API_URL;
console.log(apiUrl);

export const registerUser = createAsyncThunk(
  "user/register",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiUrl}/register`,
        { username, email, password },
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

// Define login action
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
      // Assuming the response data includes a JWT token and userId
      console.log(response.data)
      return response.data; // Expecting { token: "jwt_token_here", userId: "some_id" }
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
      state.token = null; // Clear token on logout
      state.userHistory = []; // Clear user history on logout
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
        state.userId = action.payload.userId; // Ensure userId is set correctly
        state.token = action.payload.token; // Store token if included in the response
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
        state.userId = action.payload.userId; // Store userId directly
        state.token = action.payload.token; // Store JWT token
        state.user = { userId: action.payload.userId }; // Optionally store user object with userId
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
