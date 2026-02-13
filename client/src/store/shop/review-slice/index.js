import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviews: [],
  error: null,
};

// Add a review
export const addReview = createAsyncThunk(
  "/order/addReview",
  async (formdata, { rejectWithValue }) => {
    try {
      console.log("🔵 Sending review data:", formdata);
      const response = await axios.post(
        `http://localhost:5000/api/shop/review/add`,
        formdata
      );
      console.log("✅ Review added:", response.data);
      return response.data; // Ensure backend response format matches
    } catch (error) {
      console.error("❌ Error adding review:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Failed to add review");
    }
  }
);

// Get reviews
export const getReviews = createAsyncThunk(
  "/order/getReviews",
  async (id, { rejectWithValue }) => {
    try {
      console.log("🔵 Fetching reviews for product:", id);
      const response = await axios.get(`http://localhost:5000/api/shop/review/product/${id}`);
      console.log("✅ Fetched reviews:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching reviews:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Failed to fetch reviews");
    }
  }
);

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Reviews
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload?.data || []; // ✅ Fix response structure
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.reviews = [];
      })
      // Add Review
      .addCase(addReview.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload?.success) {
          state.reviews.unshift(action.payload.review); // ✅ Add new review at the beginning
        } else {
          console.error("❌ Review submission failed:", action.payload);
        }
      })
      .addCase(addReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default reviewSlice.reducer;
