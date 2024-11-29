import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { patch, post, get } from "../api/APIService";
import { clearCart } from '../slices/CartSlice';




export const clearError = createAction('orders/clearError');


// Async actions for CRUD operations
export const addNewOrder = createAsyncThunk(
  'orders/addNewOrder',
  async (req, { dispatch, rejectWithValue }) => {
    try {
    const response = await post(`/order/addOrder`, req);
    if (response.errors.length > 0) {
        return rejectWithValue(response.errors[0].message);
    }
    dispatch(clearCart());

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
}
);

export const fetchOrderById = createAsyncThunk(
    'orders/fetchOrderById',
    async (orderId, { rejectWithValue }) => {
      try {
      const response = await get(`/order/{id}?id=${orderId}`);
      if (response.errors.length > 0) {
          return rejectWithValue(response.errors[0].message);
      }
  
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
  );

  export const fetchOrdersByUser = createAsyncThunk(
    'orders/fetchOrdersByUser',
    async (userId, { rejectWithValue }) => {
      try {
      const response = await get(`/order/getOrdersByUser/{id}?id=${userId}`);
      if (response.errors.length > 0) {
          return rejectWithValue(response.errors[0].message);
      }
  
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
  );

  export const fetchAllOrders = createAsyncThunk(
    'orders/fetchAllOrder',
    async (_, { rejectWithValue }) => {
      try {
      const response = await get(`/whoIsBoss/admin/order/allOrder`);
      if (response.errors.length > 0) {
          return rejectWithValue(response.errors[0].message);
      }
  
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
  );

  export const updateOrder = createAsyncThunk(
    'orders/updateOrder',
    async ({id,req}, { rejectWithValue }) => {
      try {
      const response = await patch(`/whoIsBoss/admin/order?id=${id}`, req);
      if (response.errors.length > 0) {
          return rejectWithValue(response.errors[0].message);
      }
  
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
  );