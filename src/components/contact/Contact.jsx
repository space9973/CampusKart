import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
     const [formData, setFormData] = useState({
          name: '',
          email: '',
          subject: '',
          message: ''
     });

     const [submitStatus, setSubmitStatus] = useState({
          submitted: false,
          success: false,
          message: ''
     });

     const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData(prevState => ({
               ...prevState,
               [name]: value
          }));
     };

     const handleSubmit = (e) => {
          e.preventDefault();
          // Here you would typically send the data to your backend
          // For now, we'll just simulate a successful submission
          setSubmitStatus({
               submitted: true,
               success: true,
               message: 'Thank you for your message! We will get back to you soon.'
          });
          setFormData({
               name: '',
               email: '',
               subject: '',
               message: ''
          });
     };

     return (
          <div className="contact-page">
               <div className="contact-header">
                    <h1>Contact Us</h1>
                    <p>Have questions? We'd love to hear from you.</p>
               </div>

               <div className="contact-container">
                    <div className="contact-info">
                         <div className="info-section">
                              <h3>Get in Touch</h3>
                              <p>We're here to help and answer any questions you might have.</p>
                         </div>

                         <div className="info-item">
                              <i className="fas fa-envelope"></i>
                              <div>
                                   <h4>Email</h4>
                                   <p>support@campuskart.com</p>
                              </div>
                         </div>

                         <div className="info-item">
                              <i className="fas fa-phone"></i>
                              <div>
                                   <h4>Phone</h4>
                                   <p>+91 (123) 456-7890</p>
                              </div>
                         </div>

                         <div className="info-item">
                              <i className="fas fa-map-marker-alt"></i>
                              <div>
                                   <h4>Location</h4>
                                   <p>University Campus, Main Building<br />New Delhi, India</p>
                              </div>
                         </div>

                         <div className="social-links">
                              <h4>Follow Us</h4>
                              <div className="social-icons">
                                   <a href="#" className="social-icon"><i className="fab fa-facebook"></i></a>
                                   <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
                                   <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
                                   <a href="#" className="social-icon"><i className="fab fa-linkedin"></i></a>
                              </div>
                         </div>
                    </div>

                    <div className="contact-form">
                         <h3>Send us a Message</h3>
                         {submitStatus.submitted && (
                              <div className={`submit-message ${submitStatus.success ? 'success' : 'error'}`}>
                                   {submitStatus.message}
                              </div>
                         )}
                         <form onSubmit={handleSubmit}>
                              <div className="form-group">
                                   <label htmlFor="name">Name</label>
                                   <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Your name"
                                   />
                              </div>

                              <div className="form-group">
                                   <label htmlFor="email">Email</label>
                                   <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="Your email"
                                   />
                              </div>

                              <div className="form-group">
                                   <label htmlFor="subject">Subject</label>
                                   <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        placeholder="Subject"
                                   />
                              </div>

                              <div className="form-group">
                                   <label htmlFor="message">Message</label>
                                   <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        placeholder="Your message"
                                        rows="5"
                                   ></textarea>
                              </div>

                              <button type="submit" className="submit-button">
                                   Send Message
                              </button>
                         </form>
                    </div>
               </div>
          </div>
     );
};

export default Contact; 