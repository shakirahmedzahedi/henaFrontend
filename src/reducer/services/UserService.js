import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { patch, post, get } from "../api/APIService";


export const clearError = createAction('users/clearError');

export const fetchAllUsers = createAsyncThunk(
    'users/fetchAllUsers',
    async (_, { rejectWithValue }) => {
      try {
      const response = await get(`/whoIsBoss/admin/allUsers`);
      if (response.errors.length > 0) {
          return rejectWithValue(response.errors[0].message);
      }
  
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
  );

  export const addRoleToUser = createAsyncThunk(
    'users/addRoleToUser',
    async ({id, role}, { rejectWithValue }) => {
      try {
      const response = await post(`/whoIsBoss/admin/user/addRole?id=${id}&role=${role}`);
      if (response.errors.length > 0) {
          return rejectWithValue(response.errors[0].message);
      }
  
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
  );