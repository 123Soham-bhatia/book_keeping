import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AuthContext';  // Global context
import { UserIcon } from '@heroicons/react/24/outline';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login, loading, error } = useAppContext();  // Global action/state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);  // Global action (calls backend, updates user/token)
      navigate('/');
    } catch (err) {
      alert(error || 'Login failed');
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--book-brown)' }}>Signing in...</div>;

  return (
    <div className="gradient-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem' }}>
      <div className="card" style={{ maxWidth: '400px', width: '100%', padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <UserIcon style={{ width: '48px', height: '48px', color: 'var(--book-brown)', margin: '0 auto 0.5rem' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--book-brown)' }}>Welcome Back</h2>
          <p style={{ color: '#666', fontSize: '0.875rem' }}>Sign in to your BookShelf account</p>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
          <button type="submit" className="btn" style={{ width: '100%' }}>Login</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1rem', color: '#666', fontSize: '0.875rem' }}>
          Don't have an account? <Link to="/signup" style={{ color: 'var(--book-choc)', textDecoration: 'none' }}>Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;