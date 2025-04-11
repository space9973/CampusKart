import React from 'react';
import './HowItWorks.css';

const HowItWorks = () => {
     const steps = [
          {
               title: 'List Your Items',
               description: 'Create a detailed listing with photos, description, and price.',
               icon: '📝'
          },
          {
               title: 'Connect with Buyers',
               description: 'Interested buyers can view your contact information and reach out directly.',
               icon: '🤝'
          },
          {
               title: 'Make the Sale',
               description: 'Arrange a safe meeting place and complete your transaction.',
               icon: '💰'
          }
     ];

     return (
          <section className="how-it-works">
               <h2>How It Works</h2>
               <div className="steps-container">
                    {steps.map((step, index) => (
                         <div key={index} className="step">
                              <div className="step-icon">{step.icon}</div>
                              <h3>{step.title}</h3>
                              <p>{step.description}</p>
                         </div>
                    ))}
               </div>
          </section>
     );
};

export default HowItWorks; 