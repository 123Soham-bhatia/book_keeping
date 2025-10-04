import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import BookCard from '../components/BookCard';
import ReviewCard from '../components/ReviewCard';
import { useAppContext } from '../context/AuthContext';

const BookDetails = () => {
  const { id } = useParams();
  const [reviewForm, setReviewForm] = useState({ rating: 5, reviewText: '' });
  const { currentBook, reviews, loading, error, fetchBook, fetchReviews, addReview, deleteBook } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBook(id);
    fetchReviews(id);
  }, [id, fetchBook, fetchReviews]);

  const handleAddReview = async (e) => {
    e.preventDefault();
    try {
      await addReview(id, reviewForm);
      setReviewForm({ rating: 5, reviewText: '' });
    } catch (err) {
      alert(error || 'Failed to add review');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id);
        navigate('/');
      } catch (err) {
        alert('Failed to delete book');
      }
    }
  };

  console.log('BookDetails render - currentBook:', currentBook);  // Debug log

  if (loading) return <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--book-brown)' }}>Loading...</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>Error: {error}</div>;
  if (!currentBook) return (
    <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
      Book not found or access denied. <Link to="/" style={{ color: 'var(--book-choc)', textDecoration: 'none' }}>Back to Books</Link>
    </div>
  );

  return (
    <div className="container" style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <button onClick={() => navigate('/')} className="btn" style={{ backgroundColor: '#666' }}>Back to Books</button>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Link to={`/edit-book/${id}`} className="btn" style={{ backgroundColor: 'var(--book-green)' }}>Edit Book</Link>
          <button onClick={handleDelete} className="btn" style={{ backgroundColor: '#dc2626' }}>Delete Book</button>
        </div>
      </div>
      <BookCard book={currentBook} />
      <h2 style={{ fontSize: '1.5rem', color: 'var(--book-brown)', margin: '1.5rem 0 1rem' }}>Reviews</h2>
      <div style={{ marginBottom: '1.5rem' }}>
        {reviews.length ? (
          reviews.map(review => <ReviewCard key={review._id} review={review} />)
        ) : (
          <p style={{ color: '#666', textAlign: 'center' }}>No reviews yet. Be the first to add one!</p>
        )}
      </div>
      <form onSubmit={handleAddReview} className="card" style={{ padding: '1.5rem', maxWidth: '500px' }}>
        <div className="form-group">
          <label style={{ fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Rating</label>
          <select value={reviewForm.rating} onChange={(e) => setReviewForm({...reviewForm, rating: parseInt(e.target.value)})} className="input" style={{ display: 'block' }}>
            {[1,2,3,4,5].map(r => <option key={r} value={r}>{r} Stars</option>)}
          </select>
        </div>
        <div className="form-group">
          <label style={{ fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Your Review</label>
          <textarea placeholder="Share your thoughts..." value={reviewForm.reviewText} onChange={(e) => setReviewForm({...reviewForm, reviewText: e.target.value})} className="input" rows="4" required />
        </div>
        <button type="submit" className="btn btn-secondary" style={{ width: '100%' }}>Add Review</button>
      </form>
    </div>
  );
};

export default BookDetails;