import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Layout, Users, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="navbar glass-panel">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="text-gradient-accent">Tej</span>Nest
        </Link>
        
        <div className="navbar-links">
          <Link to="/" className="nav-link">
            <Home size={18} />
            <span>Home</span>
          </Link>
          <Link to="/designers" className="nav-link">
            <Users size={18} />
            <span>Designers</span>
          </Link>
          {isAuthenticated && user?.role === 'ROLE_DESIGNER' && (
            <Link to="/dashboard" className="nav-link">
              <Layout size={18} />
              <span>Dashboard</span>
            </Link>
          )}
        </div>

        <div className="navbar-actions">
          {isAuthenticated ? (
            <>
              <div className="user-profile nav-link">
                <div className="avatar-sm glass-panel">{user?.username?.charAt(0)}</div>
                <span>{user?.username}</span>
              </div>
              <button className="btn btn-glass" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-glass">
                <LogIn size={18} />
                <span>Login</span>
              </Link>
              <Link to="/signup" className="btn btn-primary">
                <UserPlus size={18} />
                <span>Join Now</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
