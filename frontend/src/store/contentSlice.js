
// contentSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useState } from 'react';

// Helper for API URLs
const API_BASE_URL = 'https://todo-project-server-cesb.onrender.com/api/user';


// Thunk to create a new user
export const createUser = createAsyncThunk(
  'content/createUser',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/newuser`, formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'An error occurred.');
    }
  }
);

export const loginUser = createAsyncThunk(
  'content/loginUser',
  async (Data, thunkAPI) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, Data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'An error occurred.');
    }
  }
);

// Thunk to create a new post
export const createPost = createAsyncThunk(
  'content/createPost',
  async (postData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/newpost`, postData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk to fetch all posts of a user
export const getUserPosts = createAsyncThunk(
  'content/getUserPosts',
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${userId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk to fetch a single post
export const getSinglePost = createAsyncThunk(
  'content/getSinglePost',
  async (postId, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts/${postId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk to update a post
export const updatePost = createAsyncThunk(
  'content/updatePost',
  async ({ postId, updates }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/posts/${postId}`, updates);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk to delete a post
export const deletePost = createAsyncThunk(
  'content/deletePost',
  async (postId, thunkAPI) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/posts/${postId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Initial state
const initialState = {
  user: null,
  userId: null,
  posts: [],
  post: null,
  status: 'idle',
  error: null,
  successMessage: null,
};



const contentSlice = createSlice({
  
  name: 'content',
  initialState,
  reducers: {
    resetMessage(state) {
      state.successMessage = '';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.successMessage = 'User created successfully!';
        state.user = action.payload.user;
        state.userId = action.payload.user._id;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.successMessage = 'User loggedin successfully!';
        state.user = action.payload.user;
        state.userId = action.payload.user._id;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(createPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.successMessage = 'Post created successfully!';
        state.posts.push(action.payload.post);
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload.user.posts;
        // setallposts(action.payload.user.posts);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.successMessage = 'Post deleted successfully!';
        state.posts = state.posts.filter((post) => post._id !== action.payload.post._id);
      });
  },
});

export const { resetMessage } = contentSlice.actions;
export default contentSlice.reducer;


