import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/todos',
  );
  return response.data;
});

const TodosSlice = createSlice({
  name: 'todos',
  initialState: {
    data: [],
    isLoader: false,
    isError: false,
  },
  extraReducers: builder => {
    builder.addCase(fetchTodos.pending, (state, action) => {
      state.isLoader = true;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.isLoader = false;
      state.data = action.payload;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.isLoader = false;
      state.isError = true;
    });
  },
});

export {fetchTodos};

export default TodosSlice.reducer;
