import React, { createContext, useReducer, useContext, useEffect, useCallback } from 'react';
import { loginUser, signupUser } from '../services/auth';
import { getBooks, getBook as getBookService, addBook as addBookService, updateBook, deleteBook } from '../services/books';
import { getReviewsByBook, addReview as addReviewService, updateReview, deleteReview } from '../services/reviews';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

// Initial state
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  books: [],
  currentBook: null,
  reviews: [],
  loading: false,
  error: null,
};

// Reducer for actions
const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      return { ...state, token: action.payload.token, user: action.payload.user };
    case 'LOGOUT':
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return { ...initialState, books: [], reviews: [] };
    case 'SET_BOOKS':
      return { ...state, books: action.payload };
    case 'ADD_BOOK':
      return { ...state, books: [...state.books, action.payload] };
    case 'SET_CURRENT_BOOK':
      return { ...state, currentBook: action.payload };
    case 'SET_REVIEWS':
      return { ...state, reviews: action.payload };
    case 'ADD_REVIEW':
      return { ...state, reviews: [...state.reviews, action.payload] };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Auto-fetch books on login/mount if user exists
  useEffect(() => {
    if (state.user && state.books.length === 0) {
      fetchBooks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.user]);

  // Actions (memoized)
  const setLoading = useCallback((loading) => dispatch({ type: 'SET_LOADING', payload: loading }), []);
  const setError = useCallback((error) => dispatch({ type: 'SET_ERROR', payload: error }), []);

  const signup = useCallback(async (name, email, password) => {
    setLoading(true);
    try {
      await signupUser(name, email, password);
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const data = await loginUser(email, password);
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, dispatch]);

  const logout = useCallback(() => dispatch({ type: 'LOGOUT' }), [dispatch]);

  const fetchBooks = useCallback(async () => {
    if (state.loading || state.books.length > 0) return;
    setLoading(true);
    try {
      const books = await getBooks();
      dispatch({ type: 'SET_BOOKS', payload: books });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [state.loading, state.books.length, setLoading, setError, dispatch]);

  const addBook = useCallback(async (bookData) => {
    setLoading(true);
    try {
      const newBook = await addBookService(bookData);
      dispatch({ type: 'ADD_BOOK', payload: newBook });
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, dispatch]);

  const fetchBook = useCallback(async (id) => {
    setLoading(true);
    console.log('Frontend fetching book ID:', id);
    try {
      const book = await getBookService(id);
      console.log('Frontend received book:', book ? book.title : 'null');
      if (book) {
        dispatch({ type: 'SET_CURRENT_BOOK', payload: book });
      } else {
        // Fallback: Try to find in global books list
        const fallbackBook = state.books.find(b => b._id === id);
        if (fallbackBook) {
          console.log('Using fallback book:', fallbackBook.title);
          dispatch({ type: 'SET_CURRENT_BOOK', payload: fallbackBook });
        } else {
          throw new Error('Book not found in cache');
        }
      }
    } catch (err) {
      console.error('Frontend fetchBook error:', err.response?.status, err.message);
      if (err.response?.status === 403) {
        setError('Access denied - book not available');
      } else if (err.response?.status === 404) {
        setError('Book not found');
      } else {
        setError(err.message || 'Failed to load book');
      }
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, dispatch, state.books]);

  const fetchReviews = useCallback(async (bookId) => {
    setLoading(true);
    try {
      const { reviews } = await getReviewsByBook(bookId);
      dispatch({ type: 'SET_REVIEWS', payload: reviews });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, dispatch]);

  const addReview = useCallback(async (bookId, reviewData) => {
    setLoading(true);
    try {
      const newReview = await addReviewService(bookId, reviewData);
      dispatch({ type: 'ADD_REVIEW', payload: newReview });
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, dispatch]);

  const updateBook = useCallback(async (id, bookData) => {
    setLoading(true);
    console.log('Updating book ID:', id, 'with data:', bookData);  // Debug
    try {
      const updated = await updateBook(id, bookData);
      console.log('Updated book from backend:', updated);  // Debug
      // Refresh list
      dispatch({ type: 'SET_BOOKS', payload: state.books.map(b => b._id === id ? updated : b) });
      if (state.currentBook?._id === id) {
        dispatch({ type: 'SET_CURRENT_BOOK', payload: updated });
      }
      setError(null);
    } catch (err) {
      console.error('Update error:', err.response?.status, err.message);  // Debug
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, dispatch, state.books, state.currentBook]);

  const deleteBook = useCallback(async (id) => {
    setLoading(true);
    console.log('Deleting book ID:', id);  // Debug
    try {
      const result = await deleteBook(id);
      console.log('Delete result:', result);  // Debug
      // Refresh list
      dispatch({ type: 'SET_BOOKS', payload: state.books.filter(b => b._id !== id) });
      if (state.currentBook?._id === id) {
        dispatch({ type: 'SET_CURRENT_BOOK', payload: null });
      }
      setError(null);
    } catch (err) {
      console.error('Delete error:', err.response?.status, err.message);  // Debug
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, dispatch, state.books, state.currentBook]);

  const value = {
    ...state,
    signup,
    login,
    logout,
    fetchBooks,
    addBook,
    fetchBook,
    fetchReviews,
    addReview,
    updateBook,
    deleteBook,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};