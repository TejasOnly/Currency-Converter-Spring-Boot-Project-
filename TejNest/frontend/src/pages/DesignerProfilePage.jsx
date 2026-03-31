import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MessageSquare, DollarSign, Award, Grid, Info } from 'lucide-react';
import ContactModal from '../components/ui/ContactModal';
import './DesignerProfilePage.css';

import { designerService, portfolioService } from '../services/api';

const DesignerProfilePage = () => {
  const { id } = useParams();
  const [designer, setDesigner] = useState(null);
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [designerRes, portfolioRes] = await Promise.all([
          designerService.getById(id),
          portfolioService.getByDesigner(id)
        ]);
        setDesigner(designerRes.data);
        setPortfolios(portfolioRes.data);
      } catch (err) {
        console.error("Error fetching designer details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const [showContact, setShowContact] = useState(false);

  if (loading) return <div className="app-container">Loading...</div>;
  if (!designer) return <div className="app-container">Designer not found.</div>;

  return (
    <div className="designer-profile-page app-container">
      {showContact && <ContactModal designer={designer} onClose={() => setShowContact(false)} />}
      <Link to="/designers" className="back-link">
        <ArrowLeft size={20} />
        <span>Back to designers</span>
      </Link>
      
      {/* ... existing header ... */}
      <section className="profile-header">
        <div className="profile-main">
          <div className="profile-avatar glass-panel">
            {designer.username.charAt(0)}
          </div>
          <div className="profile-info">
            <h1 className="text-gradient-accent">{designer.username}</h1>
            <p className="designer-tagline">{designer.style} Expert</p>
            <div className="profile-stats">
              <div className="stat">
                {/* Fixed Star component usage locally */}
                <Star size={16} fill="var(--accent-primary)" />
                <span>4.9 (124 reviews)</span>
              </div>
              <div className="stat">
                <Award size={16} />
                <span>45 Projects</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="profile-cta glass-panel">
          <div className="price-tag">
            <DollarSign size={24} />
            <span className="amount">{designer.hourlyRate}</span>
            <span className="unit">/hr</span>
          </div>
          <button className="btn btn-primary w-full" onClick={() => setShowContact(true)}>
            <MessageSquare size={18} />
            <span>Contact {designer.username.split(' ')[0]}</span>
          </button>
        </div>
      </section>

      <nav className="profile-tabs">
        <button className="tab-link active">
          <Grid size={18} />
          <span>Portfolio</span>
        </button>
        <button className="tab-link">
          <Info size={18} />
          <span>About</span>
        </button>
      </nav>

      <div className="portfolio-grid">
        {portfolios.map(project => (
          <div key={project.id} className="portfolio-item glass-panel glass-panel-hover">
            <div className="project-image">
              <img src={project.imageUrl || 'https://via.placeholder.com/600x400'} alt={project.title} />
            </div>
            <div className="project-details">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Internal Star component since it was missed in imports but used
const Star = ({ size, fill }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill || "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default DesignerProfilePage;
