// Import getToken 
import { getToken } from "./authenticate";

// Base API URL from environment variable
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper function to handle fetch requests
const makeRequest = async (url, method, token) => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Authorization': `JWT ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      return await response.json();
    }
    return [];
  } catch (error) {
    console.error(`Error in ${method} ${url}:`, error);
    return [];
  }
};

// Add item to favourites, PUT
export const addToFavourites = async (id) => {
  const token = await getToken();
  const url = `${API_URL}/favourites/${id}`;
  return makeRequest(url, 'PUT', token);
};

// Remove item from favourites, Delete
export const removeFromFavourites = async (id) => {
  const token = await getToken();
  const url = `${API_URL}/favourites/${id}`;
  return makeRequest(url, 'DELETE', token);
};

// Get all favourites, Get
export const getFavourites = async () => {
  const token = await getToken();
  const url = `${API_URL}/favourites`;
  return makeRequest(url, 'GET', token);
};

// Add item to history, PUT
export const addToHistory = async (id) => {
  const token = await getToken();
  const url = `${API_URL}/history/${id}`;
  return makeRequest(url, 'PUT', token);
};

// Remove item from history, DELETE
export const removeFromHistory = async (id) => {
  const token = await getToken();
  const url = `${API_URL}/history/${id}`;
  return makeRequest(url, 'DELETE', token);
};

// Get all history, GET 
export const getHistory = async () => {
  const token = await getToken();
  const url = `${API_URL}/history`;
  return makeRequest(url, 'GET', token);
};