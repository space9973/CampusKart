import { useState } from 'react';

const products = [
     {
          id: 1,
          title: 'Engineering Mathematics Textbook',
          category: 'Books',
          price: 450,
          condition: 'Like New',
          seller: 'Arjun S.',
          location: 'Engineering Block',
          timePosted: '2 days ago',
          image: '/images/math-book.jpg'
     },
     {
          id: 2,
          title: 'HP Laptop - Core i5, 8GB RAM',
          category: 'Electronics',
          price: 28000,
          condition: 'Good',
          seller: 'Priya M.',
          location: 'Computer Science Dept',
          timePosted: '5 days ago',
          image: '/images/laptop.jpg'
     },
     {
          id: 3,
          title: 'Scientific Calculator - Casio FX-991ES',
          category: 'Electronics',
          price: 750,
          condition: 'Good',
          seller: 'Rahul K.',
          location: 'Physics Block',
          timePosted: '1 week ago',
          image: '/images/calculator.jpg'
     },
     {
          id: 4,
          title: 'Stainless Steel Water Bottle',
          category: 'Daily Essentials',
          price: 350,
          condition: 'Like New',
          seller: 'Neha T.',
          location: 'Girls Hostel',
          timePosted: '3 days ago',
          image: '/images/water-bottle.jpg'
     }
];

const ExploreProducts = () => {
     const [activeTab, setActiveTab] = useState('Featured');

     return (
          <section className="explore-section">
               <div className="explore-header">
                    <h2>Explore Products</h2>
                    <div className="explore-tabs">
                         <button
                              className={`tab-button ${activeTab === 'Featured' ? 'active' : ''}`}
                              onClick={() => setActiveTab('Featured')}
                         >
                              Featured
                         </button>
                         <button
                              className={`tab-button ${activeTab === 'Recently Added' ? 'active' : ''}`}
                              onClick={() => setActiveTab('Recently Added')}
                         >
                              Recently Added
                         </button>
                    </div>
               </div>

               <div className="products-grid">
                    {products.map((product) => (
                         <div key={product.id} className="product-card">
                              <div className="product-image">
                                   <img src={product.image} alt={product.title} />
                                   <button className="favorite-button">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                   </button>
                              </div>
                              <div className="product-info">
                                   <div className="product-category">
                                        <span>{product.category}</span>
                                        <span className="condition">{product.condition}</span>
                                   </div>
                                   <h3 className="product-title">{product.title}</h3>
                                   <div className="product-price">₹{product.price}</div>
                                   <div className="product-meta">
                                        <div className="seller-info">
                                             <span>{product.seller}</span>
                                             <span className="location">{product.location}</span>
                                        </div>
                                        <span className="time-posted">{product.timePosted}</span>
                                   </div>
                              </div>
                         </div>
                    ))}
               </div>
          </section>
     );
};

export default ExploreProducts; 