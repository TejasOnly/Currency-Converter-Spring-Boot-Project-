import React from 'react';
import { ArrowRight, Sparkles, Shield, Clock } from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="app-container">
          <div className="hero-content">
            <div className="badge glass-panel">
              <Sparkles size={16} className="text-gradient-accent" />
              <span>Discover the future of interior design</span>
            </div>
            <h1 className="hero-title">
              Crafting <span className="text-gradient-accent">Luxury</span> Through <span className="text-gradient">Nest</span> Wisdom.
            </h1>
            <p className="hero-subtitle">
              Connect with top-tier interior designers who transform your space into a sanctuary of elegance. Modern, unique, and tailored to your price.
            </p>
            <div className="hero-cta">
              <button className="btn btn-primary">
                Explore Designers <ArrowRight size={18} />
              </button>
              <button className="btn btn-glass">
                Learn More
              </button>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="glass-card-stack">
            <div className="glass-card glass-panel floating-1"></div>
            <div className="glass-card glass-panel floating-2"></div>
            <div className="glass-card glass-panel floating-3"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section app-container">
        <div className="feature-card glass-panel glass-panel-hover">
          <Shield className="feature-icon" size={32} />
          <h3>Verified Professionals</h3>
          <p>Every designer on TejNest is thoroughly vetted for quality and experience.</p>
        </div>
        <div className="feature-card glass-panel glass-panel-hover">
          <Sparkles className="feature-icon" size={32} />
          <h3>Unique Portfolios</h3>
          <p>Explore breathtaking works and find a style that resonates with your vision.</p>
        </div>
        <div className="feature-card glass-panel glass-panel-hover">
          <Clock className="feature-icon" size={32} />
          <h3>Fresh Talent</h3>
          <p>Discover up-and-coming designers bringing new perspectives to the industry.</p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
