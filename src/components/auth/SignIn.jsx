import { useState } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [error, setError] = useState('');
     const [loading, setLoading] = useState(false);
     const navigate = useNavigate();

     const handleSubmit = async (e) => {
          e.preventDefault();
          setError('');
          setLoading(true);

          try {
               await signInWithEmailAndPassword(auth, email, password);
               navigate('/'); // Redirect to home page after successful sign in
          } catch (err) {
               setError(err.message);
          } finally {
               setLoading(false);
          }
     };

     const handleGoogleSignIn = async () => {
          setError('');
          setLoading(true);
          const provider = new GoogleAuthProvider();

          try {
               await signInWithPopup(auth, provider);
               navigate('/');
          } catch (err) {
               setError(err.message);
          } finally {
               setLoading(false);
          }
     };

     return (
          <div className="auth-container">
               <div className="auth-box">
                    <h2>Sign In</h2>
                    {error && <div className="auth-error">{error}</div>}
                    <form onSubmit={handleSubmit} className="auth-form">
                         <div className="form-group">
                              <label htmlFor="email">Email</label>
                              <input
                                   type="email"
                                   id="email"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   required
                              />
                         </div>
                         <div className="form-group">
                              <label htmlFor="password">Password</label>
                              <input
                                   type="password"
                                   id="password"
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   required
                              />
                         </div>
                         <button type="submit" disabled={loading} className="auth-button">
                              {loading ? 'Signing in...' : 'Sign In'}
                         </button>
                    </form>
                    <div className="auth-divider">
                         <span>or</span>
                    </div>
                    <button
                         onClick={handleGoogleSignIn}
                         disabled={loading}
                         className="google-auth-button"
                    >
                         <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
                         Sign in with Google
                    </button>
                    <div className="auth-links">
                         <Link to="/forgot-password">Forgot Password?</Link>
                         <p>
                              Don't have an account? <Link to="/signup">Sign Up</Link>
                         </p>
                    </div>
               </div>
          </div>
     );
};

export default SignIn; 