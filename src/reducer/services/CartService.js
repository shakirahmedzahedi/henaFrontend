import {createAsyncThunk } from '@reduxjs/toolkit';
import { post, get } from './../api/APIService';
import axios from 'axios';

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async ({ userId, productId, unit }, { rejectWithValue }) => {
      try {

        const response = await post('/user/addToCart', { userId, productId, unit });

        if (response.errors.length > 0) {
            return rejectWithValue(response.errors[0].message);
        }
        
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  
  export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async ({ userId, productId, unit }, { rejectWithValue }) => {
      try {

        const response = await post('/user/removeFromCart', { userId, productId, unit });

        if (response.errors.length > 0) {
            return rejectWithValue(response.errors[0].message);
        }
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const deleteCart = createAsyncThunk(
    'cart/deleteCart',
    async ({ userId, productId, unit }, { rejectWithValue }) => {
      try {
        const response = await post(`/user/deleteArticle`, { userId, productId, unit });
       
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const feachActiveCartsByUser = createAsyncThunk(
    'cart/feachActiveCartsByUser',
    async (userId, { rejectWithValue }) => {
      try {
        const response = await get(`/user/feachActiveCartsByUser?userId=${userId}`);
        if (response.errors.length > 0) {
            return rejectWithValue(response.errors[0].message);
        }
        return response.data; 
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );