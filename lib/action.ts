import axios from 'axios';

export const getProducts = async () => {
  const products = await axios.get('/api/products');
  return products.data;
};

export const getCategories = async () => {
  const categories = await axios.get('/api/categories');
  return categories.data;
};

export const getStore = async () => {
  const store = await axios.get('/api/store');
  return store.data;
};
export const postOrders = async (session_id: string) => {
  const store = await axios.post('/api/orders', { session_id });
  return store.data;
};
