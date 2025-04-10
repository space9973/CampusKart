const Hero = () => {
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
                    <div className="search-container">
                         <input
                              type="search"
                              placeholder="Search for books, electronics, essentials..."
                              className="hero-search-input"
                         />
                    </div>
                    <div className="popular-searches">
                         <span>Popular:</span>
                         <a href="#" className="popular-link">engineering</a>
                         <a href="#" className="popular-link">textbooks</a>
                         <a href="#" className="popular-link">used laptop</a>
                         <a href="#" className="popular-link">hostel furniture</a>
                    </div>
                    <div className="cta-buttons">
                         <button className="cta-button primary">Browse Items</button>
                         <button className="cta-button secondary">Start Selling</button>
                    </div>
               </div>
          </section>
     );
};

export default Hero; 