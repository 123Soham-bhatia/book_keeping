import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpenIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const BookCard = ({ book, onDelete, onEdit }) => (
  <div style={{ textDecoration: 'none' }}>
    <div className="card" style={{ padding: '1.5rem', position: 'relative' }}>
      <BookOpenIcon style={{ width: '32px', height: '32px', color: 'var(--book-brown)', marginBottom: '0.5rem' }} />
      <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--book-brown)', marginBottom: '0.25rem' }}>{book.title}</h3>
      <p style={{ color: 'var(--book-choc)', marginBottom: '0.5rem' }}>By {book.author}</p>
      {book.genre && <span style={{ display: 'inline-block', backgroundColor: 'var(--book-green)', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{book.genre}</span>}
      <p style={{ color: '#666', fontSize: '0.875rem' }}>{book.year}</p>
      <p style={{ color: '#999', marginTop: '0.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{book.description}</p>
      
      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', justifyContent: 'flex-end' }}>
        <Link to={`/edit-book/${book._id}`} style={{ textDecoration: 'none' }}>
          <button className="btn" style={{ backgroundColor: 'var(--book-green)', padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>
            <PencilIcon style={{ width: '16px', height: '16px', marginRight: '0.25rem', display: 'inline' }} />
            Edit
          </button>
        </Link>
        <button onClick={onDelete} className="btn" style={{ backgroundColor: '#dc2626', padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>
          <TrashIcon style={{ width: '16px', height: '16px', marginRight: '0.25rem', display: 'inline' }} />
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default BookCard;