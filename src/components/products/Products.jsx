import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { books } from '../../DB/books';
import { electronics } from '../../DB/electronics';
import { furniture } from '../../DB/furniture';
import './Products.css';

const Products = () => {
     const [searchParams, setSearchParams] = useSearchParams();
     const [products, setProducts] = useState([]);
     const [loading, setLoading] = useState(true);
     const [filter, setFilter] = useState('all');
     const [searchQuery, setSearchQuery] = useState('');
     const [sortBy, setSortBy] = useState('newest');

     useEffect(() => {
          // Get search query from URL parameters
          const urlSearch = searchParams.get('search');
          if (urlSearch) {
               setSearchQuery(urlSearch);

               // Set appropriate filter based on search query
               if (urlSearch.toLowerCase().includes('book') || urlSearch.toLowerCase().includes('textbook')) {
                    setFilter('books');
               } else if (urlSearch.toLowerCase().includes('electronics') || urlSearch.toLowerCase().includes('laptop')) {
                    setFilter('electronics');
               } else if (urlSearch.toLowerCase().includes('furniture')) {
                    setFilter('furniture');
               }
          }

          // Combine all products from different categories
          const allProducts = [...books, ...electronics, ...furniture];

          // Sort by posted date initially
          const sortedProducts = allProducts.sort((a, b) => {
               const dateA = new Date(a.postedDate);
               const dateB = new Date(b.postedDate);
               return dateB - dateA;
          });

          setProducts(sortedProducts);
          setLoading(false);
     }, [searchParams]);

     const handleSearchChange = (e) => {
          const query = e.target.value;
          setSearchQuery(query);
          // Update URL with search query
          if (query) {
               setSearchParams({ search: query });
          } else {
               setSearchParams({});
          }
     };

     const handleFilterChange = (newFilter) => {
          setFilter(newFilter);
          // Preserve search query in URL when changing filters
          if (searchQuery) {
               setSearchParams({ search: searchQuery });
          }
     };

     const filterProducts = (products) => {
          let filtered = [...products];

          if (filter !== 'all') {
               filtered = filtered.filter(product =>
                    product.category?.toLowerCase() === filter.toLowerCase()
               );
          }

          if (searchQuery) {
               filtered = filtered.filter(product =>
                    product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    product.description?.toLowerCase().includes(searchQuery.toLowerCase())
               );
          }

          switch (sortBy) {
               case 'priceHigh':
                    filtered.sort((a, b) => b.price - a.price);
                    break;
               case 'priceLow':
                    filtered.sort((a, b) => a.price - b.price);
                    break;
               case 'newest':
                    filtered.sort((a, b) => {
                         const dateA = new Date(a.postedDate);
                         const dateB = new Date(b.postedDate);
                         return dateB - dateA;
                    });
                    break;
               default:
                    break;
          }

          return filtered;
     };

     const filteredProducts = filterProducts(products);

     return (
          <div className="products-container">
               <div className="products-header">
                    <h1>Browse Products</h1>
                    <div className="search-bar">
                         <input
                              type="text"
                              placeholder="Search products..."
                              value={searchQuery}
                              onChange={handleSearchChange}
                              className="search-input"
                         />
                    </div>
               </div>

               <div className="filters-section">
                    <div className="category-filters">
                         <button
                              className={`filter-button ${filter === 'all' ? 'active' : ''}`}
                              onClick={() => handleFilterChange('all')}
                         >
                              All
                         </button>
                         <button
                              className={`filter-button ${filter === 'books' ? 'active' : ''}`}
                              onClick={() => handleFilterChange('books')}
                         >
                              Books
                         </button>
                         <button
                              className={`filter-button ${filter === 'electronics' ? 'active' : ''}`}
                              onClick={() => handleFilterChange('electronics')}
                         >
                              Electronics
                         </button>
                         <button
                              className={`filter-button ${filter === 'furniture' ? 'active' : ''}`}
                              onClick={() => handleFilterChange('furniture')}
                         >
                              Furniture
                         </button>
                    </div>

                    <div className="sort-options">
                         <select
                              value={sortBy}
                              onChange={(e) => setSortBy(e.target.value)}
                              className="sort-select"
                         >
                              <option value="newest">Newest First</option>
                              <option value="priceHigh">Price: High to Low</option>
                              <option value="priceLow">Price: Low to High</option>
                         </select>
                    </div>
               </div>

               <div className="products-content">
                    {loading ? (
                         <div className="loading-state">
                              <div className="loading-spinner"></div>
                              <p>Loading products...</p>
                         </div>
                    ) : filteredProducts.length === 0 ? (
                         <div className="empty-state">
                              <h2>No products found</h2>
                              <p>Try adjusting your filters or search query</p>
                         </div>
                    ) : (
                         <div className="products-grid">
                              {filteredProducts.map(product => (
                                   <div key={product.id} className="product-card">
                                        <div className="product-image">
                                             <img
                                                  src={product.imageUrl || '/placeholder-image.jpg'}
                                                  alt={product.title}
                                                  onError={(e) => {
                                                       e.target.src = '/placeholder-image.jpg';
                                                  }}
                                             />
                                             {!product.isAvailable && (
                                                  <div className="sold-overlay">SOLD</div>
                                             )}
                                        </div>
                                        <div className="product-info">
                                             <h3>{product.title}</h3>
                                             <p className="price">₹{product.price.toLocaleString('en-IN')}</p>
                                             <p className="description">{product.description}</p>
                                             <div className="product-footer">
                                                  <button
                                                       className="view-details-button"
                                                       onClick={() => window.location.href = `/product/${product.id}`}
                                                  >
                                                       View Details
                                                  </button>
                                                  {product.isAvailable && (
                                                       <button className="contact-seller-button">
                                                            Contact Seller
                                                       </button>
                                                  )}
                                             </div>
                                        </div>
                                   </div>
                              ))}
                         </div>
                    )}
               </div>
          </div>
     );
};

export default Products;
