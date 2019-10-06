import axios from 'axios';

const URL = 'http://localhost:3001';

export const getProducts = (page = 1) => axios.get(`${URL}/products?_page=${page}&_limit=6`);
