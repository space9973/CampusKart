import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { storage, db } from '../../firebase/config';
import './SellProduct.css';

const SellProduct = () => {
     const { currentUser } = useAuth();
     const navigate = useNavigate();
     const [images, setImages] = useState([]);
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState('');
     const [formData, setFormData] = useState({
          productName: '',
          description: '',
          category: '',
          price: '',
          condition: 'new'
     });

     const categories = [
          'Books',
          'Electronics',
          'Furniture',
          'Clothing',
          'Sports Equipment',
          'Musical Instruments',
          'Study Materials',
          'Room Essentials',
          'Other'
     ];

     const conditions = [
          { value: 'new', label: 'New' },
          { value: 'like-new', label: 'Like New' },
          { value: 'good', label: 'Good' },
          { value: 'fair', label: 'Fair' },
          { value: 'poor', label: 'Poor' }
     ];

     const handleInputChange = (e) => {
          const { name, value } = e.target;
          setFormData(prev => ({
               ...prev,
               [name]: value
          }));
     };

     const handleImageChange = (e) => {
          const files = Array.from(e.target.files);
          if (files.length + images.length > 5) {
               setError('You can only upload up to 5 images');
               return;
          }

          // Validate file types and sizes
          for (const file of files) {
               if (!file.type.startsWith('image/')) {
                    setError('Please upload only image files');
                    return;
               }
               if (file.size > 5 * 1024 * 1024) { // 5MB limit
                    setError('Each image must be less than 5MB');
                    return;
               }
          }

          const newImages = files.map(file => ({
               url: URL.createObjectURL(file),
               file
          }));
          setImages(prev => [...prev, ...newImages]);
          setError(''); // Clear any previous errors
     };

     const removeImage = (index) => {
          setImages(prev => prev.filter((_, i) => i !== index));
     };

     const uploadImage = async (file) => {
          try {
               console.log('Starting image upload:', file.name);
               if (!currentUser) {
                    throw new Error('User not authenticated');
               }

               // Validate file type and size again before upload
               if (!file.type.startsWith('image/')) {
                    throw new Error('Invalid file type. Please upload only images.');
               }
               if (file.size > 5 * 1024 * 1024) {
                    throw new Error('File too large. Maximum size is 5MB.');
               }

               // Create a simpler path structure
               const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
               const imageRef = storageRef(storage, `images/${filename}`);
               console.log('Created storage reference:', imageRef.fullPath);

               const metadata = {
                    contentType: file.type,
                    customMetadata: {
                         userId: currentUser.uid
                    }
               };

               console.log('Attempting upload with metadata:', metadata);
               const snapshot = await uploadBytes(imageRef, file, metadata);
               console.log('Image uploaded successfully');
               const downloadURL = await getDownloadURL(snapshot.ref);
               console.log('Got download URL:', downloadURL);
               return downloadURL;
          } catch (error) {
               console.error('Error details:', {
                    code: error.code,
                    message: error.message,
                    serverResponse: error.serverResponse
               });

               if (error.code === 'storage/unauthorized') {
                    throw new Error('Upload failed: Please sign in again and retry.');
               }
               throw new Error(`Failed to upload image: ${error.message}`);
          }
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          console.log('Form submitted');
          console.log('Current user:', currentUser);

          if (!currentUser) {
               setError('Please sign in to post a product');
               return;
          }

          if (images.length < 1) {
               setError('Please upload at least one image');
               return;
          }

          if (!formData.category) {
               setError('Please select a category');
               return;
          }

          setLoading(true);
          setError('');

          try {
               console.log('Starting image uploads...');
               // Upload images to Firebase Storage
               const imageUrls = await Promise.all(
                    images.map(image => uploadImage(image.file))
               );
               console.log('Images uploaded successfully:', imageUrls);

               // Save product data to Firestore
               const productData = {
                    productName: formData.productName,
                    description: formData.description,
                    category: formData.category,
                    price: Number(formData.price),
                    condition: formData.condition,
                    images: imageUrls,
                    sellerId: currentUser.uid,
                    sellerName: currentUser.displayName || currentUser.email,
                    createdAt: new Date().toISOString(),
                    status: 'active'
               };

               console.log('Saving to Firestore:', productData);
               const docRef = await addDoc(collection(db, 'products'), productData);
               console.log('Product posted with ID:', docRef.id);

               // Navigate to the product page
               navigate(`/product/${docRef.id}`);
          } catch (error) {
               console.error('Error in handleSubmit:', error);
               setError(error.message || 'Error posting product. Please try again.');
          } finally {
               setLoading(false);
          }
     };

     return (
          <div className="sell-container">
               <div className="sell-content">
                    <h1>List Your Product</h1>
                    <p className="sell-subtitle">Fill in the details to list your product for sale</p>

                    {error && (
                         <div className="error-message">
                              {error}
                         </div>
                    )}

                    <form onSubmit={handleSubmit} className="sell-form">
                         <div className="form-section">
                              <h2>Basic Information</h2>

                              <div className="form-group">
                                   <label htmlFor="productName">Product Name*</label>
                                   <input
                                        type="text"
                                        id="productName"
                                        name="productName"
                                        value={formData.productName}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Enter product name"
                                   />
                              </div>

                              <div className="form-group">
                                   <label htmlFor="description">Description*</label>
                                   <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Describe your product (condition, features, etc.)"
                                        rows="4"
                                   />
                              </div>

                              <div className="form-row">
                                   <div className="form-group">
                                        <label htmlFor="category">Category*</label>
                                        <select
                                             id="category"
                                             name="category"
                                             value={formData.category}
                                             onChange={handleInputChange}
                                             required
                                        >
                                             <option value="">Select a category</option>
                                             {categories.map(category => (
                                                  <option key={category} value={category}>
                                                       {category}
                                                  </option>
                                             ))}
                                        </select>
                                   </div>

                                   <div className="form-group">
                                        <label htmlFor="condition">Condition*</label>
                                        <select
                                             id="condition"
                                             name="condition"
                                             value={formData.condition}
                                             onChange={handleInputChange}
                                             required
                                        >
                                             {conditions.map(({ value, label }) => (
                                                  <option key={value} value={value}>
                                                       {label}
                                                  </option>
                                             ))}
                                        </select>
                                   </div>
                              </div>

                              <div className="form-group">
                                   <label htmlFor="price">Price (₹)*</label>
                                   <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        required
                                        min="0"
                                        placeholder="Enter price"
                                   />
                              </div>
                         </div>

                         <div className="form-section">
                              <h2>Product Images</h2>
                              <p className="image-hint">Upload at least 1 image (maximum 5)</p>

                              <div className="image-upload-container">
                                   <div className="image-grid">
                                        {images.map((image, index) => (
                                             <div key={index} className="image-preview">
                                                  <img src={image.url} alt={`Preview ${index + 1}`} />
                                                  <button
                                                       type="button"
                                                       className="remove-image"
                                                       onClick={() => removeImage(index)}
                                                  >
                                                       ×
                                                  </button>
                                             </div>
                                        ))}
                                        {images.length < 5 && (
                                             <label className="image-upload-box">
                                                  <input
                                                       type="file"
                                                       accept="image/*"
                                                       multiple
                                                       onChange={handleImageChange}
                                                       style={{ display: 'none' }}
                                                  />
                                                  <div className="upload-icon">+</div>
                                                  <span>Add Images</span>
                                             </label>
                                        )}
                                   </div>
                              </div>
                         </div>

                         <button type="submit" className="submit-button" disabled={loading}>
                              {loading ? 'Posting...' : 'Post Product'}
                         </button>
                    </form>
               </div>
          </div>
     );
};

export default SellProduct; 