/**
 * @author: Egide Ntwali
 * @description: The axios configuration
 * @param {AxiosRequestConfig} config The axios request configuration
 * @param {AxiosResponse} response The axios response
 * @param {AxiosError} error The axios error
 * @returns {AxiosInstance} The axios instance
 * @returns {AxiosInstance} The axios instance
 */

import axios from 'axios';

// Create a new Axios instance

// export const API_URL = 'http://localhost:8080/api/v1';
export const API_URL = 'https://apiplaxisaicom.up.railway.app/api/v1';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptors
api.interceptors.request.use(
  (config) => {
    // Add any headers, authentication tokens, or other configurations
    // that should be applied to all requests here

    // Check if a bearer token is available
    const token = localStorage.getItem('token');

    // If a token is found, add it to the headers
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptors
api.interceptors.response.use(
  (response) => {
    // Do something with the response data
    return response; // Return the response data directly
  },
  (error) => {
    // Handle errors that occur with any request
    if (error.response) {
      // The request was made, but the server responded with an error status code
    } else if (error.request) {
      // The request was made, but no response was received
    } else {
      // Something happened in setting up the request that triggered an Error
    }
    return Promise.reject(error);
  }
);

export default api;
