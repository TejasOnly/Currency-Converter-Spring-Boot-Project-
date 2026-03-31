import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, Briefcase } from 'lucide-react';
import './AuthPages.css';

import api from '../services/api';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/auth/signup', { ...formData, role });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page app-container">
      <div className="auth-card glass-panel">
        <div className="auth-header">
          <div className="auth-icon glass-panel">
            <UserPlus size={24} className="text-gradient-accent" />
          </div>
          <h1 className="text-gradient">Join TejNest</h1>
          <p>Start your journey with us today</p>
        </div>

        <div className="role-selector">
          <button 
            className={`role-btn glass-panel ${role === 'user' ? 'active' : ''}`}
            onClick={() => setRole('user')}
          >
            <User size={20} />
            <span>I'm a Home Owner</span>
          </button>
          <button 
            className={`role-btn glass-panel ${role === 'designer' ? 'active' : ''}`}
            onClick={() => setRole('designer')}
          >
            <Briefcase size={20} />
            <span>I'm a Designer</span>
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <div className="input-wrapper glass-panel">
              <User size={18} />
              <input type="text" name="username" placeholder="johnny" value={formData.username} onChange={handleChange} required />
            </div>
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <div className="input-wrapper glass-panel">
              <Mail size={18} />
              <input type="email" name="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} required />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-wrapper glass-panel">
              <Lock size={18} />
              <input type="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Create Account
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
