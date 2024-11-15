
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1';

// Retrieve the email and token from local storage
const getHeaders = () => {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '', // Optional Bearer token
        'email': email || ''
    };
};

// Save token in local storage if returned in response
const saveToken = (newToken) => {
    if (newToken) {
        localStorage.setItem('token', newToken);
    }
};

// Generic function to handle requests
const request = async (method, url, data = null) => {
    console.log(data);
    try {
        const response = await axios({
            method,
            url: `${BASE_URL}${url}`,
            headers: getHeaders(),
            data
        });

        // Check for token in the response headers or data and update if available
        const newToken = /* response.headers['Authorization'] || */ response.data?.token;
        saveToken(newToken);
        console.log(newToken);

        return response.data; // Return only data
    } catch (error) {
        if (error.response) {
            console.error(`Error with ${method.toUpperCase()} request to ${url}`, error);
            const { status, data } = error.response;
      
            if (status === 403) {
              throw new Error('Access denied. You do not have permission to perform this action.');
            } else if (status === 401) {
              throw new Error('Unauthorized. Please log in again.');
            } else {
              throw new Error(data.message || 'An error occurred while processing your request.');
            }
          } else if (error.request) {
            console.error(`No response received for ${method.toUpperCase()} request to ${url}`);
            throw new Error('Network error. Please check your connection.');
          } else {
            // Something happened in setting up the request
            console.error(`Error setting up ${method.toUpperCase()} request to ${url}`);
            throw new Error('An unexpected error occurred.');
          }
    }
};

// GET request
const get = (url) => request('get', url);

// POST request
const post = (url, data) => request('post', url, data);

// DELETE request
const remove = (url) => request('delete', url);

// PATCH request
const patch = (url, data) => request('patch', url, data);

export { get, post, remove, patch };
