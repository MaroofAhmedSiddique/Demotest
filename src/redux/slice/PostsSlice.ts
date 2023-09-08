import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const fetchPosts = createAsyncThunk('todos/fetchPosts', async () => {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/posts',
  );
  return response.data;
});

const PostsSlice = createSlice({
  name: 'posts',
  initialState: {
    data: [],
    isLoader: false,
    isError: false,
  },
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.isLoader = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.isLoader = false;
      state.data = action.payload;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.isLoader = false;
      state.isError = true;
    });
  },
});

export {fetchPosts};

export default PostsSlice.reducer;
