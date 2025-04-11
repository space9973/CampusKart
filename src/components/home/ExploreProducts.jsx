import { useState } from 'react';
import { books } from '../../DB/books';
import { electronics } from '../../DB/electronics';
import { furniture } from '../../DB/furniture';
import './ExploreProducts.css';

const allProducts = [...books, ...electronics, ...furniture];

const ExploreProducts = () => {
     const [selectedCategory, setSelectedCategory] = useState('All');
     const [sortBy, setSortBy] = useState('Newest First');
     const [likedProducts, setLikedProducts] = useState({});

     const handleLike = (productId) => {
          setLikedProducts(prev => ({
               ...prev,
               [productId]: !prev[productId]
          }));
     };

     const getFilteredProducts = () => {
          let filtered = [...allProducts];

          // Apply category filter
          if (selectedCategory !== 'All') {
               filtered = filtered.filter(product =>
                    product.category.toLowerCase() === selectedCategory.toLowerCase()
               );
          }

          // Apply sorting
          switch (sortBy) {
               case 'Newest First':
                    filtered.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
                    break;
               case 'Price: High to Low':
                    filtered.sort((a, b) => b.price - a.price);
                    break;
               case 'Price: Low to High':
                    filtered.sort((a, b) => a.price - b.price);
                    break;
               default:
                    break;
          }

          return filtered;
     };

     const filteredProducts = getFilteredProducts();

     return (
          <section className="explore-section">
               <div className="explore-header">
                    <h2>Browse Products</h2>
                    <div className="filters-section">
                         <div className="category-filters">
                              <button
                                   className={`tab-button ${selectedCategory === 'All' ? 'active' : ''}`}
                                   onClick={() => setSelectedCategory('All')}
                              >
                                   All
                              </button>
                              <button
                                   className={`tab-button ${selectedCategory === 'Books' ? 'active' : ''}`}
                                   onClick={() => setSelectedCategory('Books')}
                              >
                                   Books
                              </button>
                              <button
                                   className={`tab-button ${selectedCategory === 'Electronics' ? 'active' : ''}`}
                                   onClick={() => setSelectedCategory('Electronics')}
                              >
                                   Electronics
                              </button>
                              <button
                                   className={`tab-button ${selectedCategory === 'Furniture' ? 'active' : ''}`}
                                   onClick={() => setSelectedCategory('Furniture')}
                              >
                                   Furniture
                              </button>
                              <button
                                   className={`tab-button ${selectedCategory === 'Other' ? 'active' : ''}`}
                                   onClick={() => setSelectedCategory('Other')}
                              >
                                   Other
                              </button>
                         </div>

                         <select
                              value={sortBy}
                              onChange={(e) => setSortBy(e.target.value)}
                              className="sort-select"
                         >
                              <option value="Newest First">Newest First</option>
                              <option value="Price: High to Low">Price: High to Low</option>
                              <option value="Price: Low to High">Price: Low to High</option>
                         </select>
                    </div>
               </div>

               <div className="products-grid">
                    {filteredProducts.length === 0 ? (
                         <div className="no-products">
                              <h2>No products found</h2>
                              <p>Try adjusting your filters or search query</p>
                         </div>
                    ) : (
                         filteredProducts.map((product) => (
                              <div key={product.id} className="product-card">
                                   <div className="product-image">
                                        {product.imageUrl ? (
                                             <img src={product.imageUrl} alt={product.title} />
                                        ) : (
                                             <div className="product-image-placeholder">No image available</div>
                                        )}
                                        <button
                                             className={`favorite-button ${likedProducts[product.id] ? 'liked' : ''}`}
                                             onClick={() => handleLike(product.id)}
                                        >
                                             <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  viewBox="0 0 24 24"
                                                  fill={likedProducts[product.id] ? "currentColor" : "none"}
                                                  stroke="currentColor"
                                                  strokeWidth="2"
                                                  className="w-6 h-6"
                                             >
                                                  <path
                                                       strokeLinecap="round"
                                                       strokeLinejoin="round"
                                                       d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                                  />
                                             </svg>
                                        </button>
                                   </div>
                                   <div className="product-info">
                                        <div className="product-category">
                                             <span>{product.category}</span>
                                             <span className="condition">{product.condition}</span>
                                        </div>
                                        <h3 className="product-title">{product.title}</h3>
                                        <div className="product-price">${product.price.toFixed(2)}</div>
                                        <div className="product-meta">
                                             <div className="seller-info">
                                                  <span>{product.seller.name}</span>
                                                  <span className="location">{product.location}</span>
                                             </div>
                                             <span className="time-posted">Posted {new Date(product.postedDate).toLocaleDateString()}</span>
                                        </div>
                                   </div>
                              </div>
                         ))
                    )}
               </div>
          </section>
     );
};

export default ExploreProducts; 