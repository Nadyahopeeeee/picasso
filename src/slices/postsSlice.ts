import { createSlice, createAsyncThunk, AsyncThunk, ThunkAction, Action } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostState {
  data: Post[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const fetchPosts: AsyncThunk<Post[], void, {}> = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();
  return data;
});

const initialState: PostState = {
  data: [],
  status: 'idle',
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch posts';
      });
  },
});

export default postsSlice.reducer;
