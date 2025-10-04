import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AuthContext';  // Global context
import { UserPlusIcon } from '@heroicons/react/24/outline';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { signup, loading, error } = useAppContext();  // Global action/state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData.name, formData.email, formData.password);  // Global action (calls backend)
      navigate('/login');
    } catch (err) {
      alert(error || 'Signup failed');
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--book-brown)' }}>Creating account...</div>;

  return (
    <div className="gradient-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem' }}>
      <div className="card" style={{ maxWidth: '400px', width: '100%', padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <UserPlusIcon style={{ width: '48px', height: '48px', color: 'var(--book-brown)', margin: '0 auto 0.5rem' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--book-brown)' }}>Join BookShelf</h2>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group">
            <input
              type="text" placeholder="Full Name" value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email" placeholder="Email" value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="input"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password" placeholder="Password" value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="input"
              required
            />
          </div>
          <button type="submit" className="btn" style={{ width: '100%' }}>Signup</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1rem', color: '#666', fontSize: '0.875rem' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--book-choc)', textDecoration: 'none' }}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;