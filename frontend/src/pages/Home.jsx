import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard';
import { useAppContext } from '../context/AuthContext';  // Fixed: AppContext (not AuthContext)

const Home = () => {
  const { books, loading, error, fetchBooks, deleteBook } = useAppContext();  // Now from correct context

  useEffect(() => {
    fetchBooks();  // Calls backend, loads books
  }, [fetchBooks]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id);  // Global action (calls backend, updates list)
      } catch (err) {
        alert('Failed to delete book');
      }
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--book-brown)' }}>Loading books...</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>Error: {error}</div>;

  return (
    <div className="container" style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--book-brown)' }}>My Books</h1>
        <Link to="/add-book" className="btn btn-secondary">Add New Book</Link>
      </div>
      <div className="grid-books">
        {books.length ? (
          books.map(book => (
            <BookCard 
              key={book._id} 
              book={book} 
              onDelete={() => handleDelete(book._id)}  // Pass delete handler
            />
          ))
        ) : (
          <p style={{ textAlign: 'center', color: '#666' }}>No books yet. Add one to get started!</p>
        )}
      </div>
    </div>
  );
};

export default Home;