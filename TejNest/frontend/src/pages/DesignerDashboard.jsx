import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, Image as ImageIcon, Layout } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { portfolioService } from '../services/api';
import api from '../services/api';
import './DesignerDashboard.css';

const DesignerDashboard = () => {
  const { user } = useAuth();
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', description: '', imageUrl: '' });

  useEffect(() => {
    fetchPortfolios();
  }, [user]);

  const fetchPortfolios = async () => {
    if (!user) return;
    try {
      const res = await portfolioService.getByDesigner(user.id);
      setPortfolios(res.data);
    } catch (err) {
      console.error("Error fetching portfolios", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      await api.post('/portfolios', { ...newProject, designerId: user.id });
      setShowAddModal(false);
      setNewProject({ title: '', description: '', imageUrl: '' });
      fetchPortfolios();
    } catch (err) {
      alert("Failed to add project.");
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await api.delete(`/portfolios/${id}`);
      fetchPortfolios();
    } catch (err) {
      alert("Failed to delete project.");
    }
  };

  return (
    <div className="dashboard-page app-container">
      <header className="dashboard-header">
        <div>
          <h1 className="text-gradient">Designer Dashboard</h1>
          <p>Manage your professional portfolio and showcase your best work.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          <Plus size={18} />
          <span>Add New Project</span>
        </button>
      </header>

      <div className="stats-grid">
        <div className="stat-card glass-panel">
          <Layout className="text-gradient-accent" size={24} />
          <div className="stat-value">{portfolios.length}</div>
          <div className="stat-label">Total Projects</div>
        </div>
        <div className="stat-card glass-panel">
          <ImageIcon className="text-gradient-accent" size={24} />
          <div className="stat-value">Active</div>
          <div className="stat-label">Portfolio Status</div>
        </div>
      </div>

      <div className="projects-section">
        <h2>Your Projects</h2>
        <div className="projects-list">
          {loading ? (
            <p>Loading your work...</p>
          ) : portfolios.length > 0 ? (
            portfolios.map(project => (
              <div key={project.id} className="project-row glass-panel">
                <div className="project-thumb">
                  {project.imageUrl ? <img src={project.imageUrl} alt="" /> : <ImageIcon size={24} />}
                </div>
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
                <div className="project-actions">
                  <button className="action-btn" title="Edit"><Edit3 size={18} /></button>
                  <button className="action-btn delete" onClick={() => handleDeleteProject(project.id)} title="Delete">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state glass-panel">
              <p>You haven't added any projects yet. Start building your portfolio!</p>
            </div>
          )}
        </div>
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel">
            <div className="modal-header">
              <h2>Add Portfolio Project</h2>
              <button className="close-btn" onClick={() => setShowAddModal(false)}>&times;</button>
            </div>
            <form className="auth-form" onSubmit={handleAddProject}>
              <div className="input-group">
                <label>Project Title</label>
                <div className="input-wrapper glass-panel">
                  <input 
                    type="text" 
                    placeholder="e.g. Modern Penthouse" 
                    value={newProject.title}
                    onChange={e => setNewProject({...newProject, title: e.target.value})}
                    required 
                  />
                </div>
              </div>
              <div className="input-group">
                <label>Description</label>
                <div className="input-wrapper glass-panel">
                  <textarea 
                    placeholder="Describe the project style and materials..."
                    value={newProject.description}
                    onChange={e => setNewProject({...newProject, description: e.target.value})}
                    required
                    style={{minHeight: '100px', width: '100%', background: 'transparent', border: 'none', color: 'inherit', outline: 'none', padding: '0.5rem 0'}}
                  />
                </div>
              </div>
              <div className="input-group">
                <label>Image URL</label>
                <div className="input-wrapper glass-panel">
                  <input 
                    type="url" 
                    placeholder="https://images.unsplash.com/..." 
                    value={newProject.imageUrl}
                    onChange={e => setNewProject({...newProject, imageUrl: e.target.value})}
                    required 
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary w-full">Save Project</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignerDashboard;
