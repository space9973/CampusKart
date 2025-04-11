import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import './App.css'
import Navbar from './components/layout/Navbar'
import './components/layout/Navbar.css'
import Hero from './components/home/Hero'
import Categories from './components/home/Categories'
import ExploreProducts from './components/home/ExploreProducts'
import HowItWorks from './components/home/HowItWorks'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import ForgotPassword from './components/auth/ForgotPassword'
import SellProduct from './components/sell/SellProduct'
import About from './components/about/About'
import Products from './components/products/Products'
import Contact from './components/contact/Contact'
// import Dashboard from './components/dashboard/Dashboard'
import './components/home/Categories.css'
import './components/home/ExploreProducts.css'
import './components/home/HowItWorks.css'
import './components/footer/Footer.css'
import './components/auth/auth.css'
import './components/about/About.css'
import './components/products/Products.css'
import './components/contact/Contact.css'
import Footer from './components/footer/Footer'

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Categories />
                <ExploreProducts />
                <HowItWorks />
              </>
            } />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/sell" element={<SellProduct />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
