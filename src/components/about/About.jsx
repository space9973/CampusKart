import React from 'react';
import './About.css';

const About = () => {
     return (
          <div className="about-container">
               <div className="about-header">
                    <h1>About CollegeCart</h1>
                    <p className="tagline">Your Campus Marketplace</p>
               </div>

               <section className="about-mission">
                    <h2>Our Mission</h2>
                    <p>
                         CollegeCart is dedicated to creating a sustainable and convenient marketplace
                         exclusively for college students. We understand the unique needs of campus life
                         and aim to make buying and selling within your college community seamless and secure.
                    </p>
               </section>

               <div className="about-grid">
                    <section className="about-card">
                         <h3>For Students, By Students</h3>
                         <p>
                              Created with the college community in mind, CollegeCart provides a trusted
                              platform where students can buy and sell textbooks, electronics, furniture,
                              and more within their campus network.
                         </p>
                    </section>

                    <section className="about-card">
                         <h3>Safe & Secure</h3>
                         <p>
                              Your safety is our priority. All users are verified college students,
                              and our platform includes secure payment processing and a trusted
                              verification system.
                         </p>
                    </section>

                    <section className="about-card">
                         <h3>Sustainable Shopping</h3>
                         <p>
                              By promoting reuse and local transactions, we're helping create a more
                              sustainable campus environment while helping students save money.
                         </p>
                    </section>

                    <section className="about-card">
                         <h3>Community Focus</h3>
                         <p>
                              CollegeCart builds more than just a marketplace - we're creating a
                              community where students can help each other succeed while making
                              campus life more affordable.
                         </p>
                    </section>
               </div>

               <section className="about-features">
                    <h2>Why Choose CollegeCart?</h2>
                    <ul>
                         <li>Exclusive college student marketplace</li>
                         <li>Verified user accounts for enhanced security</li>
                         <li>Easy-to-use platform for buying and selling</li>
                         <li>Local campus transactions</li>
                         <li>Sustainable and eco-friendly approach</li>
                         <li>Support for the college community</li>
                    </ul>
               </section>

               <section className="about-join">
                    <h2>Join Our Community</h2>
                    <p>
                         Ready to start buying and selling on campus? Join thousands of college
                         students who are already using CollegeCart to make campus life better
                         and more affordable.
                    </p>
                    <button className="join-button">Get Started Today</button>
               </section>
          </div>
     );
};

export default About;