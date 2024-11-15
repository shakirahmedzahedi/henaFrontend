import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { post, get } from './../api/APIService';
import axios from 'axios';



export const clearError = createAction('products/clearError');


// Async actions for CRUD operations
export const fetchAllProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
    const response = await get(`/product/allProduct`);
    if (response.errors.length > 0) {
        return rejectWithValue(response.errors[0].message);
    }

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
}
);

export const fetchProductById = createAsyncThunk(
  'products/fetchById',
  async (productId, { rejectWithValue }) => {
    try {
    const response = await get(`/product/{id}?id=${productId}`);
    if (response.errors.length > 0) {
        return rejectWithValue(response.errors[0].message);
    }

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
}
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData,{ rejectWithValue }) => {

    const obj = {};

    try {
      productData.forEach((value, key) => {
      
        if (value instanceof File) {
          obj[key] = value; 
        } else {
            if (key ==='stock')
              {
                obj[key] = parseInt(value);
              }else if (key ==='price' || key ==='discountPercentage' || key ==='rating'|| key ==='weight' )
                {
                  obj[key] = parseFloat(value);
                }
              else{
                obj[key] = value;
              }
            
          
          
        }
      });

      console.log(obj);
    const response = await post(`/whoIsBoss/admin/product/addProduct`, obj);
    if (response.errors.length > 0) {
        return rejectWithValue(response.errors[0].message);
    }

    return response.data;
  }catch (error) {
    console.log(error);
    const errorMessage = error.response?.data?.message || 'Failed to add product. Please try again.'; 
      return rejectWithValue(errorMessage);
    
  }
}
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ productId, updatedData }) => {
    const response = await axios.put(`/${productId}`, updatedData);
    return response.data;
  }
);

export const updateProductStock = createAsyncThunk(
  'products/updateStock',
  async ({ productId, stock }) => {
    const response = await axios.patch(`/${productId}`, { stock });
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId) => {
    await axios.delete(`/${productId}`);
    return productId;
  }
);