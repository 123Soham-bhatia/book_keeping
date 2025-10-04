import api from './api';

export const getBooks = async () => {
  const res = await api.get('/books');
  return res.data;  // Array of books
};

export const getBook = async (id) => {
  const res = await api.get(`/books/${id}`);
  return res.data;  // Single book
};

export const addBook = async (bookData) => {
  const res = await api.post('/books', bookData);
  return res.data;
};

export const updateBook = async (id, bookData) => {
  const res = await api.put(`/books/${id}`, bookData);
  return res.data;
};

export const deleteBook = async (id) => {
  const res = await api.delete(`/books/${id}`);
  return res.data;  // { message: 'Deleted' }
};