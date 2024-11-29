import { createSlice } from '@reduxjs/toolkit';
import {fetchAllCoupons, fetchCouponByNumber, generateNewCoupon,  clearError} from '../services/DiscountCouponService';

const initialState = {
    coupons: [],
    coupon: null,
    discountedCoupon:null,
    loading: false,
    error: null,
    success:null,
  };
  
  // Create slice
  const couponSlice = createSlice({
    name: 'coupons',
    initialState,
    reducers: {
      clearCoupon: (state) => {
          state.discountedCoupon = null;
      },
  },
    extraReducers: (builder) => {
      builder
      .addCase(clearError, (state) => {
        state.error = null;
      })
        // Fetch all products
        .addCase(fetchAllCoupons.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchAllCoupons.fulfilled, (state, action) => {
          state.loading = false;
          state.coupons = action.payload;
        })
        .addCase(fetchAllCoupons.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
  
        // Fetch product by ID
        .addCase(fetchCouponByNumber.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchCouponByNumber.fulfilled, (state, action) => {
          state.loading = false;
          state.discountedCoupon = action.payload;
        })
        .addCase(fetchCouponByNumber.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload ? action.payload : action.error.message;
        })
        .addCase(generateNewCoupon.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(generateNewCoupon.fulfilled, (state, action) => {
          state.loading = false;
          state.coupon = action.payload;
        })
        .addCase(generateNewCoupon.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
  
    }   
  });
  
  export const { clearCoupon } = couponSlice.actions;
  export default couponSlice.reducer;