import React from 'react';
import { ExternalLink, Star, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import './DesignerCard.css';

const DesignerCard = ({ designer }) => {
  return (
    <div className="designer-card glass-panel glass-panel-hover">
      <div className="designer-image-container">
        <div className="placeholder-image">
          {designer.username.charAt(0).toUpperCase()}
        </div>
        <div className="designer-badge glass-panel">
          <Star size={12} fill="var(--accent-primary)" />
          <span>New</span>
        </div>
      </div>
      
      <div className="designer-info">
        <h3>{designer.username}</h3>
        <p className="designer-style">{designer.style}</p>
        <p className="designer-bio">{designer.bio}</p>
        
        <div className="designer-footer">
          <div className="designer-price">
            <DollarSign size={16} />
            <span>{designer.hourlyRate}/hr</span>
          </div>
          <Link to={`/designers/${designer.id}`} className="btn btn-glass btn-sm">
            View Work <ExternalLink size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DesignerCard;
