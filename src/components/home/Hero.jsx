// Test automatic deployment
// This is a test change to verify Vercel auto-deployment
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
     const [searchQuery, setSearchQuery] = useState('');
     const navigate = useNavigate();

     const handleSearch = (e) => {
          e.preventDefault(); // Prevent form submission default behavior
          if (searchQuery.trim()) {
               navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
          }
     };

     const handlePopularSearch = (query) => {
          navigate(`/products?search=${encodeURIComponent(query)}`);
     };

     return (
          <section className="hero">
               <div className="hero-content">
                    <h1 className="hero-title">
                         Buy, Sell, and Exchange<br />
                         within Your Campus
                    </h1>
                    <p className="hero-subtitle">
                         Join the sustainable marketplace exclusively for college students. Find
                         affordable essentials or earn by selling what you don't need.
                    </p>
                    <form onSubmit={handleSearch} className="search-container">
                         <input
                              type="search"
                              placeholder="Search for books, electronics, essentials..."
                              className="hero-search-input"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                         />
                    </form>
                    <div className="popular-searches">
                         <span>Popular:</span>
                         <button
                              type="button"
                              onClick={() => handlePopularSearch('engineering')}
                              className="popular-link"
                         >
                              engineering
                         </button>
                         <button
                              type="button"
                              onClick={() => handlePopularSearch('textbooks')}
                              className="popular-link"
                         >
                              textbooks
                         </button>
                         <button
                              type="button"
                              onClick={() => handlePopularSearch('used laptop')}
                              className="popular-link"
                         >
                              used laptop
                         </button>
                         <button
                              type="button"
                              onClick={() => handlePopularSearch('hostel furniture')}
                              className="popular-link"
                         >
                              hostel furniture
                         </button>
                    </div>
                    <div className="cta-buttons">
                         <button
                              type="button"
                              onClick={() => navigate('/products')}
                              className="cta-button primary"
                         >
                              Browse Items
                         </button>
                         <button
                              type="button"
                              onClick={() => navigate('/sell')}
                              className="cta-button secondary"
                         >
                              Start Selling
                         </button>
                    </div>
               </div>
          </section>
     );
};

export default Hero; 