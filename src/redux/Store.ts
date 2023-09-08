import {configureStore} from '@reduxjs/toolkit';
import TodosSlice from './slice/TodosSlice';
import PostsSlice from './slice/PostsSlice';

export const Store = configureStore({
  reducer: {
    todos: TodosSlice,
    posts: PostsSlice,
  },
});
