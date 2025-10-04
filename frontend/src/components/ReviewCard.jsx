import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

const ReviewCard = ({ review }) => (
  <div className="card" style={{ padding: '1rem', borderLeft: '4px solid var(--book-green)', marginBottom: '0.75rem' }}>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
      <span style={{ fontWeight: '600', color: 'var(--book-brown)', marginRight: '0.5rem' }}>{review.userId?.name || 'Anonymous'}</span>
      <div className="stars" style={{ display: 'flex' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon 
            key={star} 
            style={{ width: '16px', height: '16px' }} 
            className={star <= review.rating ? 'star-filled' : 'star-empty'} 
          />
        ))}
      </div>
    </div>
    <p style={{ color: '#666', fontStyle: 'italic' }}>{review.reviewText}</p>
  </div>
);

export default ReviewCard;