import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postServices from "../api/postService";

const initialState = {
  data: [],
  loading: "idle",
  error: null,
};

export const get_AllPosts = createAsyncThunk("posts/get_AllPosts", async () => {
  try {
    const res = postServices.getAllPosts();
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
});

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(get_AllPosts.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(get_AllPosts.fulfilled, (state, action) => {
      (state.loading = "fulfilled"), (state.data = action.payload);
    });
    builder.addCase(get_AllPosts.rejected, (state, action) => {
      (state.loading = "rejected"), (state.action = action.payload);
    });
  },
});

export default postSlice;
