
import { createAsyncThunk } from '@reduxjs/toolkit';
import { patch, post, get } from './../api/APIService';
import { signout } from '../slices/AuthSlice';

// Define async thunk for signIn
export const signIn = createAsyncThunk(
    'auth/signin',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await post('/auth/signin', credentials);
            if (response.errors.length > 0) {
                return rejectWithValue(response.errors[0].message);
            }
            
            localStorage.setItem('token', response.token);
            localStorage.setItem('email', credentials.email); 
            localStorage.setItem('isAuthenticate', true); 
            console.error(response.data);

            return response.data; 

        } catch (error) {
            console.error('Sign-in error:', error);
            return rejectWithValue(error.response?.data || 'Sign-in failed');
        }
    }
);

// Define async thunk for signUp
export const signUp = createAsyncThunk(
    'auth/signup',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await post('/auth/signup', userData);
            if (response.errors.length > 0) {
                return rejectWithValue(response.errors[0].message);
            }
            // Return success data
            return response.data;
        } catch (error) {
    
            return rejectWithValue('Failed to register user. Please try again later.');
        }
    }
);

// Define async thunk for signOut
export const logOut = createAsyncThunk(
    'auth/signout', 
    async (_, { dispatch }) => {
    console.log("Hello sign out");
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('isAuthenticate');
     dispatch(signout());
     return true;

});

export const updateAddress = createAsyncThunk(
    'auth/updateAddress',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await patch('/user/updateAddress', userData);
            if (response.errors.length > 0) {
                return rejectWithValue(response.errors[0].message);
            }
            // Return success data
            return response.data;
        } catch (error) {
    
            return rejectWithValue('Failed to register user. Please try again later.');
        }
    }
);

export const fetchUserById = createAsyncThunk(
    'auth/fetchUserById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await get(`/user/fetchUser?userId=${id}`);
            if (response.errors.length > 0) {
                return rejectWithValue(response.errors[0].message);
            }
           
            return response.data;
        } catch (error) {
    
            return rejectWithValue('Failed to register user. Please try again later.');
        }
    }
);

export const addToFavorite = createAsyncThunk(
    'auth/addToFavorite',
    async (req, { rejectWithValue }) => {
        try {
            const response = await post('/user/addToFavorite', req);
            if (response.errors.length > 0) {
                return rejectWithValue(response.errors[0].message);
            }
           
            return response.data;
        } catch (error) {
    
            return rejectWithValue('Failed to register user. Please try again later.');
        }
    }
);

export const removeFromFavorite = createAsyncThunk(
    'auth/removeFromFavorite',
    async (req, { rejectWithValue }) => {
        try {
            const response = await post('/user/removeFromFavorite', req);
            if (response.errors.length > 0) {
                return rejectWithValue(response.errors[0].message);
            }
           
            return response.data;
        } catch (error) {
    
            return rejectWithValue('Failed to register user. Please try again later.');
        }
    }
);

export const renewToken = createAsyncThunk(
    'auth/renewToken',
    async ( email,{ rejectWithValue }) => {
        try {
            const response = await get(`/auth/renewToken?email=${email}`);
            if (response.errors.length > 0) {
                return rejectWithValue(response.errors[0].message);
            }
            localStorage.setItem('token', response.token);
            localStorage.setItem('email', email); 
            localStorage.setItem('isAuthenticate', true); 
           
            return response.data;
        } catch (error) {
    
            return rejectWithValue('Failed to renew token.');
        }
    }
);
