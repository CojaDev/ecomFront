import { mongooseConnect } from './mongoose';
import axios from 'axios';

export const getProducts = async () => {
  await mongooseConnect();
  const products = await axios.get('/api/products');
  return products.data;
};

export const getCategories = async () => {
  await mongooseConnect();
  const categories = await axios.get('/api/categories');
  return categories.data;
};

export const getStore = async () => {
  await mongooseConnect();
  const store = await axios.get('/api/store');
  return store.data;
};
