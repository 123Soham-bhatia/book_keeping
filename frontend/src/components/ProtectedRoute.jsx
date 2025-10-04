import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AuthContext';  // Fixed import
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const ProtectedRoute = ({ children }) => {
  const { token, user } = useAppContext();  // Fixed to useAppContext

  if (!token || !user) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--book-beige)' }}>
        <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: 'var(--shadow-book)' }}>
          <ExclamationTriangleIcon style={{ width: '48px', height: '48px', color: 'var(--book-choc)', margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Please Log In</h2>
          <Navigate to="/login" replace />
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;