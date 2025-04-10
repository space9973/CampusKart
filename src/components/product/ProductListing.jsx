import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import ChatModal from '../chat/ChatModal';
import './ProductListing.css';

const ProductListing = ({ product }) => {
     const { currentUser } = useAuth();
     const [isChatOpen, setIsChatOpen] = useState(false);

     const handleContactSeller = () => {
          if (!currentUser) {
               // Redirect to sign in if user is not authenticated
               window.location.href = '/signin';
               return;
          }
          setIsChatOpen(true);
     };

     return (
          <div className="product-listing">
               <div className="product-images">
                    {product.images && product.images.length > 0 ? (
                         <img src={product.images[0]} alt={product.title} className="product-main-image" />
                    ) : (
                         <div className="product-image-placeholder">No image available</div>
                    )}
               </div>

               <div className="product-info">
                    <h1 className="product-title">{product.title}</h1>
                    <p className="product-price">${product.price}</p>
                    <p className="product-description">{product.description}</p>

                    <div className="product-details">
                         <div className="detail-item">
                              <span className="detail-label">Category:</span>
                              <span className="detail-value">{product.category}</span>
                         </div>
                         <div className="detail-item">
                              <span className="detail-label">Condition:</span>
                              <span className="detail-value">{product.condition}</span>
                         </div>
                         <div className="detail-item">
                              <span className="detail-label">Location:</span>
                              <span className="detail-value">{product.location}</span>
                         </div>
                    </div>

                    <div className="seller-info">
                         <h3>Seller Information</h3>
                         <p className="seller-name">{product.sellerName}</p>
                         <button
                              className="contact-seller-btn"
                              onClick={handleContactSeller}
                         >
                              Contact Seller
                         </button>
                    </div>
               </div>

               {isChatOpen && (
                    <ChatModal
                         isOpen={isChatOpen}
                         onClose={() => setIsChatOpen(false)}
                         productId={product.id}
                         sellerId={product.sellerId}
                         productName={product.title}
                    />
               )}
          </div>
     );
};

export default ProductListing; 