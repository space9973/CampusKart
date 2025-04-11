import sofa from '../assets/Furnuture/sofa.jpeg';
import table from '../assets/Furnuture/table.jpeg';
import desk from '../assets/Furnuture/S08-22D-black-walnut-scene-pic-01-scaled.webp';

export const furniture = [
     {
          id: 'furn-001',
          title: 'Modern Sectional Sofa',
          brand: 'Article',
          price: 74699,
          condition: 'Like New',
          category: 'furniture',
          description: 'Contemporary L-shaped sectional sofa. Gray fabric, barely used, no stains or damage.',
          details: {
               material: 'Premium Fabric',
               color: 'Gray',
               dimensions: '108" x 65" x 34"',
               style: 'Modern',
               assembly: 'Not Required',
               usage: '6 months'
          },
          location: 'Portland, OR',
          seller: {
               id: 'user345',
               name: 'Lisa Anderson',
               rating: 4.9
          },
          imageUrl: sofa,
          postedDate: '2024-04-10',
          isAvailable: true
     },
     {
          id: 'furn-002',
          title: 'Solid Wood Dining Table',
          brand: 'West Elm',
          price: 41499,
          condition: 'Good',
          category: 'furniture',
          description: 'Beautiful solid oak dining table. Some minor scratches but overall great condition.',
          details: {
               material: 'Solid Oak',
               color: 'Natural Wood',
               dimensions: '72" x 36" x 30"',
               seating: '6-8 people',
               style: 'Contemporary',
               age: '2 years'
          },
          location: 'Denver, CO',
          seller: {
               id: 'user678',
               name: 'Mark Wilson',
               rating: 4.7
          },
          imageUrl: table,
          postedDate: '2024-04-09',
          isAvailable: true
     },
     {
          id: 'furn-003',
          title: 'Executive Office Desk',
          brand: 'Herman Miller',
          price: 29049,
          condition: 'Excellent',
          category: 'furniture',
          description: 'Professional office desk with built-in cable management. Perfect for home office.',
          details: {
               material: 'Walnut and Steel',
               color: 'Dark Walnut',
               dimensions: '60" x 30" x 29"',
               features: 'Cable Management, Drawers',
               style: 'Modern',
               warranty: 'Transferable warranty until 2025'
          },
          location: 'Austin, TX',
          seller: {
               id: 'user901',
               name: 'Tom Parker',
               rating: 4.8
          },
          imageUrl: desk,
          postedDate: '2024-04-08',
          isAvailable: true
     }
]; 