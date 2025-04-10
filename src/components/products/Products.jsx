import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import './Products.css';

const Products = () => {
     const [products, setProducts] = useState([]);
     const [loading, setLoading] = useState(true);
     const [filter, setFilter] = useState('all');
     const [searchQuery, setSearchQuery] = useState('');
     const [sortBy, setSortBy] = useState('newest');
     const [error, setError] = useState(null);

     useEffect(() => {
          const fetchProducts = async (retryCount = 0) => {
               try {
                    console.log('Attempting to fetch products...');
                    const querySnapshot = await getDocs(collection(db, 'products'));
                    const productsData = querySnapshot.docs.map(doc => ({
                         id: doc.id,
                         ...doc.data()
                    }));
                    console.log('Fetched products:', productsData);
                    setProducts(productsData);
                    setLoading(false);
                    setError(null);
               } catch (error) {
                    console.error("Error fetching products:", error);
                    if (retryCount < 3) {
                         console.log(`Retrying... Attempt ${retryCount + 1}`);
                         setTimeout(() => fetchProducts(retryCount + 1), 1000 * (retryCount + 1));
                    } else {
                         setError("Failed to load products. Please check your internet connection and try again.");
                         setLoading(false);
                    }
               }
          };

          fetchProducts();
     }, []);

     const filterProducts = (products) => {
          let filtered = [...products];
          console.log('Current filter:', filter);
          console.log('All products before filtering:', filtered);

          // Apply category filter
          if (filter !== 'all') {
               filtered = filtered.filter(product => {
                    console.log('Product category:', product.category, 'Filter:', filter);
                    return product.category?.toLowerCase() === filter.toLowerCase();
               });
          }
          console.log('Filtered products:', filtered);

          // Apply search filter
          if (searchQuery) {
               filtered = filtered.filter(product =>
                    product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    product.description?.toLowerCase().includes(searchQuery.toLowerCase())
               );
          }

          // Apply sorting
          switch (sortBy) {
               case 'priceHigh':
                    filtered.sort((a, b) => b.price - a.price);
                    break;
               case 'priceLow':
                    filtered.sort((a, b) => a.price - b.price);
                    break;
               case 'newest':
                    filtered.sort((a, b) => {
                         const dateA = new Date(a.createdAt || 0);
                         const dateB = new Date(b.createdAt || 0);
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
          <div className="products-page">
               <div className="products-header">
                    <h1>Browse Products</h1>
                    <div className="search-bar">
                         <input
                              type="text"
                              placeholder="Search products..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                         />
                    </div>
               </div>

               <div className="filters-section">
                    <div className="category-filters">
                         <button
                              className={filter === 'all' ? 'active' : ''}
                              onClick={() => setFilter('all')}
                         >
                              All
                         </button>
                         <button
                              className={filter === 'books' ? 'active' : ''}
                              onClick={() => setFilter('books')}
                         >
                              Books
                         </button>
                         <button
                              className={filter === 'electronics' ? 'active' : ''}
                              onClick={() => setFilter('electronics')}
                         >
                              Electronics
                         </button>
                         <button
                              className={filter === 'furniture' ? 'active' : ''}
                              onClick={() => setFilter('furniture')}
                         >
                              Furniture
                         </button>
                         <button
                              className={filter === 'other' ? 'active' : ''}
                              onClick={() => setFilter('other')}
                         >
                              Other
                         </button>
                    </div>

                    <div className="sort-options">
                         <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                              <option value="newest">Newest First</option>
                              <option value="priceHigh">Price: High to Low</option>
                              <option value="priceLow">Price: Low to High</option>
                         </select>
                    </div>
               </div>

               {loading ? (
                    <div className="loading">Loading products...</div>
               ) : error ? (
                    <div className="error-message">
                         {error}
                         <button onClick={() => window.location.reload()}>
                              Try Again
                         </button>
                    </div>
               ) : filteredProducts.length === 0 ? (
                    <div className="no-products">
                         <h2>No products found</h2>
                         <p>Try adjusting your filters or search query</p>
                    </div>
               ) : (
                    <div className="products-grid">
                         {filteredProducts.map(product => (
                              <div key={product.id} className="product-card">
                                   <div className="product-image">
                                        <img src={product.imageUrl} alt={product.name} />
                                        {product.status === 'sold' && (
                                             <div className="sold-overlay">SOLD</div>
                                        )}
                                   </div>
                                   <div className="product-info">
                                        <h3>{product.name}</h3>
                                        <p className="price">${product.price}</p>
                                        <p className="description">{product.description}</p>
                                        <div className="product-footer">
                                             <button
                                                  className="view-details"
                                                  onClick={() => window.location.href = `/product/${product.id}`}
                                             >
                                                  View Details
                                             </button>
                                             {product.status !== 'sold' && (
                                                  <button className="contact-seller">
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
     );
};

export default Products;
