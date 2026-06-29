import { createAsyncThunk } from '@reduxjs/toolkit';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';

export const fetchBlogs = createAsyncThunk(
  'blogs/fetchBlogs',
  async (params, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams({
        search: params.search || '',
        category: params.category || '',
        sortBy: params.sortBy || 'desc',
        page: params.page?.toString() || '1',
        limit: params.limit?.toString() || '6',
      });
      const response = await fetch(`${apiUrl}/blogs?${queryParams}`, {
        cache: 'no-store',
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.error);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchBlogById = createAsyncThunk(
  'blogs/fetchBlogById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/blogs/${id}`, {
        cache: 'no-store',
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.error);
      return data.blog;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createBlog = createAsyncThunk(
  'blogs/createBlog',
  async (blogData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/blogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.error);
      return data.blog;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateBlog = createAsyncThunk(
  'blogs/updateBlog',
  async ({ id, blogData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/blogs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.error);
      return data.blog;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  'blogs/deleteBlog',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/blogs/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.error);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
