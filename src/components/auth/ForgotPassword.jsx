import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
     const [email, setEmail] = useState('');
     const [error, setError] = useState('');
     const [message, setMessage] = useState('');
     const [loading, setLoading] = useState(false);

     const handleSubmit = async (e) => {
          e.preventDefault();
          setError('');
          setMessage('');
          setLoading(true);

          try {
               await sendPasswordResetEmail(auth, email);
               setMessage('Check your email for password reset instructions');
          } catch (err) {
               setError(err.message);
          } finally {
               setLoading(false);
          }
     };

     return (
          <div className="auth-container">
               <div className="auth-box">
                    <h2>Reset Password</h2>
                    {error && <div className="auth-error">{error}</div>}
                    {message && <div className="auth-success">{message}</div>}
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
                         <button type="submit" disabled={loading} className="auth-button">
                              {loading ? 'Sending...' : 'Reset Password'}
                         </button>
                    </form>
                    <div className="auth-links">
                         <Link to="/signin">Back to Sign In</Link>
                    </div>
               </div>
          </div>
     );
};

export default ForgotPassword; 