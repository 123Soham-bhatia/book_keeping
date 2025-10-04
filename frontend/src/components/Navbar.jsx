import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AuthContext';  // Global context
import { BookOpenIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const { user, logout } = useAppContext();  // Global user/logout
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();  // Global action (clears state + localStorage)
    navigate('/login');
  };

  return (
    <nav style={{ backgroundColor: 'var(--book-brown)', color: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <div className="container" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', fontWeight: 'bold' }}>
          <BookOpenIcon style={{ width: '24px', height: '24px' }} />
          <span>BookShelf</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {user ? (
            <>
              <Link to="/add-book" className="nav-link">Add Book</Link>
              <button onClick={handleLogout} className="btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="btn">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;