const steps = [
     {
          id: 1,
          number: "1",
          title: "List Your Item",
          description: "Take a photo, add details and set your price. Your item will be visible to all students on campus."
     },
     {
          id: 2,
          number: "2",
          title: "Connect & Chat",
          description: "Interested buyers will message you. Arrange a safe on-campus meeting point to complete the exchange."
     },
     {
          id: 3,
          number: "3",
          title: "Exchange & Review",
          description: "Complete the transaction in person and leave feedback to build trust in the community."
     }
];

const HowItWorks = () => {
     return (
          <section className="how-it-works">
               <div className="how-it-works-content">
                    <div className="section-header">
                         <h2>How CampusKart Works</h2>
                         <p>Simple steps to buy or sell items within your campus community</p>
                    </div>

                    <div className="steps-container">
                         {steps.map((step) => (
                              <div key={step.id} className="step-card">
                                   <div className="step-number">{step.number}</div>
                                   <h3>{step.title}</h3>
                                   <p>{step.description}</p>
                              </div>
                         ))}
                    </div>

                    <div className="learn-more">
                         <button className="learn-more-button">Learn More</button>
                    </div>
               </div>
          </section>
     );
};

export default HowItWorks; 