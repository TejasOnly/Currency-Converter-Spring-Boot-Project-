import React, { useState, useEffect } from 'react';
import { Search, Filter, SortDesc } from 'lucide-react';
import DesignerCard from '../components/ui/DesignerCard';
import './DesignersPage.css';

import { designerService } from '../services/api';

const DesignersPage = () => {
  const [designers, setDesigners] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedStyle, setSelectedStyle] = useState('');

  useEffect(() => {
    const fetchDesigners = async () => {
      try {
        const response = await designerService.getAll();
        setDesigners(response.data);
      } catch (err) {
        console.error("Failed to fetch designers", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDesigners();
  }, []);

  const filteredDesigners = designers
    .filter(d => 
      (d.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
       d.style.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedStyle === '' || d.style.toLowerCase().includes(selectedStyle.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.hourlyRate - b.hourlyRate;
      if (sortBy === 'price-high') return b.hourlyRate - a.hourlyRate;
      return b.id - a.id; // newest (mocked by ID for now)
    });

  return (
    <div className="designers-page app-container">
      <header className="page-header">
        <h1 className="text-gradient">Our Designers</h1>
        <p>Connect with the world's most talented creators of living art.</p>
      </header>

      <div className="filters-bar glass-panel">
        <div className="search-box">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by name or style..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-actions">
          <div className="filter-group">
            <Filter size={18} />
            <select value={selectedStyle} onChange={(e) => setSelectedStyle(e.target.value)}>
              <option value="">All Styles</option>
              <option value="modern">Modern</option>
              <option value="minimalist">Minimalist</option>
              <option value="classic">Classic</option>
              <option value="zen">Zen</option>
              <option value="industrial">Industrial</option>
            </select>
          </div>
          
          <div className="filter-group">
            <SortDesc size={18} />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="designers-grid">
        {loading ? (
          <p>Loading designers...</p>
        ) : filteredDesigners.length > 0 ? (
          filteredDesigners.map(designer => (
            <DesignerCard key={designer.id} designer={designer} />
          ))
        ) : (
          <p>No designers found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default DesignersPage;
