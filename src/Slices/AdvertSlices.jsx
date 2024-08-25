import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchAllAdverts = createAsyncThunk(
  "adverts/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/used-cars`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch Advert"
      );
    }
  }
);

//fetch car details
export const fetchCarDetails = createAsyncThunk(
  "advertDetail/fetchDetails",
  async (carId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/used-cars/${carId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch Car Details"
      );
    }
  }
);

// User Adverts slice
export const fetchUserAdverts = createAsyncThunk(
  "userAdverts/fetchUserAdverts",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/user-adverts/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch User Adverts"
      );
    }
  }
);

// Adverts slice
const advertsSlice = createSlice({
  name: "adverts",
  initialState: {
    adverts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAdverts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllAdverts.fulfilled, (state, action) => {
        state.loading = false;
        state.adverts = action.payload;
      })
      .addCase(fetchAllAdverts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Advert Detail slice
const advertDetailSlice = createSlice({
  name: "advertDetail",
  initialState: {
    advertDetail: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCarDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.advertDetail = action.payload;
      })
      .addCase(fetchCarDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// User Adverts slice
const userAdvertsSlice = createSlice({
  name: "userAdverts",
  initialState: {
    userAdverts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAdverts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserAdverts.fulfilled, (state, action) => {
        state.loading = false;
        state.userAdverts = action.payload;
      })
      .addCase(fetchUserAdverts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const advertsReducer = advertsSlice.reducer;
export const advertDetailReducer = advertDetailSlice.reducer;
export const userAdvertsReducer = userAdvertsSlice.reducer;
