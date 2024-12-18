import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postServices from "../api/postService";

const initialState = {
  data: [],
  loading: "idle",
  error: null,
};

export const get_AllCountries = createAsyncThunk(
  "filter/get_AllCountries",
  async () => {
    try {
      const res = postServices.getAllCountries();
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

const filterSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(get_AllCountries.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(get_AllCountries.fulfilled, (state, action) => {
      (state.loading = "fulfilled"), (state.data = action.payload);
    });
    builder.addCase(get_AllCountries.rejected, (state, action) => {
      (state.loading = "rejected"), (state.action = action.payload);
    });
  },
});

export default filterSlice;
