import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { auth } from '../../firebase/config';
import { useState } from 'react';

const Navbar = () => {
     const { currentUser, loading } = useAuth();
     const navigate = useNavigate();
     const [isMenuOpen, setIsMenuOpen] = useState(false);

     const handleSellClick = () => {
          if (!currentUser) {
               navigate('/signin');
          } else {
               navigate('/sell');
          }
     };

     const toggleMenu = () => {
          setIsMenuOpen(!isMenuOpen);
     };

     const closeMenu = () => {
          setIsMenuOpen(false);
     };

     return (
          <nav className="navbar">
               <div className="navbar-container">
                    <Link to="/" className="navbar-brand" onClick={closeMenu}>
                         <h2>Campus<span>Kart</span></h2>
                    </Link>

                    <button className="hamburger-menu" onClick={toggleMenu} aria-label="Toggle menu">
                         <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
                    </button>

                    <div className={`navbar-links ${isMenuOpen ? 'show' : ''}`}>
                         <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
                         <Link to="/products" className="nav-link" onClick={closeMenu}>Products</Link>
                         <Link to="/about" className="nav-link" onClick={closeMenu}>About</Link>
                         <Link to="/contact" className="nav-link" onClick={closeMenu}>Contact</Link>
                    </div>

                    <div className={`navbar-actions ${isMenuOpen ? 'show' : ''}`}>
                         <button onClick={handleSellClick} className="sell-button">
                              + Sell
                         </button>

                         {!loading && (
                              <>
                                   {currentUser ? (
                                        <div className="user-menu">
                                             <span className="welcome-text">Hello, {currentUser.displayName || currentUser.email}</span>
                                             <Link to="/profile" className="nav-link" onClick={closeMenu}>Profile</Link>
                                             <button
                                                  onClick={() => {
                                                       auth.signOut();
                                                       navigate('/');
                                                       closeMenu();
                                                  }}
                                                  className="auth-button"
                                             >
                                                  Sign Out
                                             </button>
                                        </div>
                                   ) : (
                                        <div className="auth-buttons">
                                             <Link to="/signin" className="nav-link" onClick={closeMenu}>Sign In</Link>
                                             <Link to="/signup" className="auth-button" onClick={closeMenu}>Sign Up</Link>
                                        </div>
                                   )}
                              </>
                         )}
                    </div>
               </div>
          </nav>
     );
};

export default Navbar; 