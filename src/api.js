import axios from 'axios';

const URL = 'http://localhost:3001';
const API_KEY = '';

const instance = axios.create({
  baseURL: URL
});

export const getProducts = (page = 1) => instance.get(`/products?_page=${page}&_limit=6`);

/**
 * DOT NOT MODIFY.
 */
instance.interceptors.request.use((request) => {
  const apiParam = `api_key=${API_KEY}`;
  if (request.url.includes('?')) {
    request.url += `&${apiParam}`;
    return request;
  }

  request.url += `?${apiParam}`;
  return request;
});
