import axios from 'axios';

const URL = 'http://localhost:3001';

export const getProducts = () => axios.get(`${URL}/products`);
