import api from './api';

export const getReviewsByBook = async (bookId) => {
  const res = await api.get(`/reviews/book/${bookId}`);
  return res.data;  // { reviews: [], avgRating: number }
};

export const addReview = async (bookId, reviewData) => {
  const res = await api.post('/reviews', { bookId, ...reviewData });
  return res.data;
};

export const updateReview = async (id, reviewData) => {
  const res = await api.put(`/reviews/${id}`, reviewData);
  return res.data;
};

export const deleteReview = async (id) => {
  const res = await api.delete(`/reviews/${id}`);
  return res.data;
};