const categories = [
     {
          id: 1,
          name: 'Books & Study Materials',
          icon: '📚',
          items: 152
     },
     {
          id: 2,
          name: 'Electronics',
          icon: '💻',
          items: 89
     },
     {
          id: 3,
          name: 'Furniture',
          icon: '🪑',
          items: 64
     },
     {
          id: 4,
          name: 'Clothing',
          icon: '👕',
          items: 108
     },
     {
          id: 5,
          name: 'Daily Essentials',
          icon: '🧴',
          items: 77
     },
     {
          id: 6,
          name: 'Sports Equipment',
          icon: '🏀',
          items: 43
     },
     {
          id: 7,
          name: 'Art Supplies',
          icon: '🎨',
          items: 29
     },
     {
          id: 8,
          name: 'Home Appliances',
          icon: '🔌',
          items: 51
     }
];

const Categories = () => {
     return (
          <section className="categories-section">
               <div className="categories-header">
                    <h2>Categories</h2>
                    <a href="#" className="view-all">View all</a>
               </div>
               <div className="categories-grid">
                    {categories.map((category) => (
                         <div key={category.id} className="category-card">
                              <div className="category-icon">
                                   <span>{category.icon}</span>
                              </div>
                              <h3>{category.name}</h3>
                              <p>{category.items} items</p>
                         </div>
                    ))}
               </div>
          </section>
     );
};

export default Categories; 