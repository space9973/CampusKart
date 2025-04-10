import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
     const [name, setName] = useState('');
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [confirmPassword, setConfirmPassword] = useState('');
     const [error, setError] = useState('');
     const [loading, setLoading] = useState(false);
     const navigate = useNavigate();

     const handleSubmit = async (e) => {
          e.preventDefault();
          setError('');

          if (password !== confirmPassword) {
               return setError('Passwords do not match');
          }

          setLoading(true);

          try {
               const { user } = await createUserWithEmailAndPassword(auth, email, password);
               await updateProfile(user, { displayName: name });
               navigate('/'); // Redirect to home page after successful sign up
          } catch (err) {
               setError(err.message);
          } finally {
               setLoading(false);
          }
     };

     return (
          <div className="auth-container">
               <div className="auth-box">
                    <h2>Sign Up</h2>
                    {error && <div className="auth-error">{error}</div>}
                    <form onSubmit={handleSubmit} className="auth-form">
                         <div className="form-group">
                              <label htmlFor="name">Full Name</label>
                              <input
                                   type="text"
                                   id="name"
                                   value={name}
                                   onChange={(e) => setName(e.target.value)}
                                   required
                              />
                         </div>
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
                                   minLength={6}
                              />
                         </div>
                         <div className="form-group">
                              <label htmlFor="confirmPassword">Confirm Password</label>
                              <input
                                   type="password"
                                   id="confirmPassword"
                                   value={confirmPassword}
                                   onChange={(e) => setConfirmPassword(e.target.value)}
                                   required
                                   minLength={6}
                              />
                         </div>
                         <button type="submit" disabled={loading} className="auth-button">
                              {loading ? 'Creating Account...' : 'Sign Up'}
                         </button>
                    </form>
                    <div className="auth-links">
                         <p>
                              Already have an account? <Link to="/signin">Sign In</Link>
                         </p>
                    </div>
               </div>
          </div>
     );
};

export default SignUp; 