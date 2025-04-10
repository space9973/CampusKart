import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { auth } from '../../firebase/config';

const Navbar = () => {
     const { currentUser, loading } = useAuth();
     const navigate = useNavigate();

     const handleSellClick = () => {
          if (!currentUser) {
               navigate('/signin');
          } else {
               navigate('/sell');
          }
     };

     return (
          <nav className="navbar">
               <div className="navbar-container">
                    <Link to="/" className="navbar-brand">
                         <h2>Campus<span>Kart</span></h2>
                    </Link>

                    <div className="navbar-links">
                         <Link to="/" className="nav-link">Home</Link>
                         <Link to="/products" className="nav-link">Products</Link>
                         <Link to="/about" className="nav-link">About</Link>
                         <Link to="/contact" className="nav-link">Contact</Link>
                    </div>

                    <div className="navbar-actions">
                         <button onClick={handleSellClick} className="sell-button">
                              + Sell
                         </button>

                         {!loading && (
                              <>
                                   {currentUser ? (
                                        <div className="user-menu">
                                             <span className="welcome-text">Hello, {currentUser.displayName || currentUser.email}</span>
                                             <Link to="/profile" className="nav-link">Profile</Link>
                                             <button
                                                  onClick={() => {
                                                       auth.signOut();
                                                       navigate('/');
                                                  }}
                                                  className="auth-button"
                                             >
                                                  Sign Out
                                             </button>
                                        </div>
                                   ) : (
                                        <div className="auth-buttons">
                                             <Link to="/signin" className="nav-link">Sign In</Link>
                                             <Link to="/signup" className="auth-button">Sign Up</Link>
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