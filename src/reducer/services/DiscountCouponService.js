import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { post, get } from './../api/APIService';
import axios from 'axios';



export const clearError = createAction('coupons/clearError');


// Async actions for CRUD operations
export const fetchAllCoupons = createAsyncThunk(
  'coupons/fetchAllCoupons',
  async (_, { rejectWithValue }) => {
    try {
    const response = await get(`/whoIsBoss/admin/discountCoupon/getAll`);
    if (response.errors.length > 0) {
        return rejectWithValue(response.errors[0].message);
    }

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
}
);

export const fetchCouponByNumber = createAsyncThunk(
  'coupons/fetchCouponByNumber',
  async (couponNumber, { rejectWithValue }) => {
    try {
    const response = await get(`/discountCoupon/findCoupon/?couponNumber=${couponNumber}`);
    if (response.errors.length > 0) {
      
        return rejectWithValue(response.errors[0].message);
    }

    return response.data;
  } catch (error) {
    console.log(error);

    return rejectWithValue(error.response.data);
  }
}
);

export const generateNewCoupon = createAsyncThunk(
  'coupons/generateNewCoupon',
  async (req, { rejectWithValue }) => {
    try {
    const response = await post(`/whoIsBoss/admin/discountCoupon/addNew`, req);
    if (response.errors.length > 0) {
        return rejectWithValue(response.errors[0].message);
    }

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
}
);

