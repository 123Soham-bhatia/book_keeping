import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AuthContext';  // Global context
import { PlusIcon } from '@heroicons/react/24/outline';

const AddBook = () => {
  const [formData, setFormData] = useState({ title: '', author: '', description: '', genre: '', year: '' });
  const { addBook, loading, error } = useAppContext();  // Global action/state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBook(formData);  // Global action (calls backend, updates books globally)
      navigate('/');
    } catch (err) {
      alert(error || 'Failed to add book');
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--book-brown)' }}>Adding book...</div>;

  return (
    <div className="gradient-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem' }}>
      <div className="card" style={{ maxWidth: '500px', width: '100%', padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <PlusIcon style={{ width: '48px', height: '48px', color: 'var(--book-brown)', margin: '0 auto 0.5rem' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--book-brown)' }}>Add a New Book</h2>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group">
            <input type="text" placeholder="Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="input" required />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Author" value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} className="input" required />
          </div>
          <div className="form-group">
            <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="input" rows="3" />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Genre" value={formData.genre} onChange={(e) => setFormData({...formData, genre: e.target.value})} className="input" />
          </div>
          <div className="form-group">
            <input type="number" placeholder="Year" value={formData.year} onChange={(e) => setFormData({...formData, year: e.target.value})} className="input" required />
          </div>
          <button type="submit" className="btn" style={{ width: '100%' }}>Add Book</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1rem', color: '#666' }}>
          <Link to="/" style={{ color: 'var(--book-choc)', textDecoration: 'none' }}>Back to Books</Link>
        </p>
      </div>
    </div>
  );
};

export default AddBook;