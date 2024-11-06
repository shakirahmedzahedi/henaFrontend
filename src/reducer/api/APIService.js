
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
    try {
        const response = await axios({
            method,
            url: `${BASE_URL}${url}`,
            headers: getHeaders(),
            data
        });

        // Check for token in the response headers or data and update if available
        const newToken = response.headers['Authorization'] || response.data?.token;
        saveToken(newToken);

        return response.data; // Return only data
    } catch (error) {
        console.error(`Error with ${method.toUpperCase()} request to ${url}`, error);
        throw error; // Re-throw to handle in component if needed
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
