import macbook from '../assets/Electronic/mackbook.jpeg';
import ipad from '../assets/Electronic/ipad.jpeg';
import headphones from '../assets/Electronic/sony.jpeg';

export const electronics = [
     {
          id: 'elec-001',
          title: 'MacBook Pro 13"',
          brand: 'Apple',
          price: 74699,
          condition: 'Excellent',
          category: 'electronics',
          description: '2020 MacBook Pro with M1 chip. Includes charger and original box. Battery cycle count under 100.',
          details: {
               processor: '2.4GHz Quad-Core Intel Core i5',
               memory: '8GB RAM',
               storage: '256GB SSD',
               display: '13.3-inch Retina Display',
               graphics: 'Intel Iris Plus Graphics',
               batteryLife: 'Up to 10 hours'
          },
          location: 'New York, NY',
          seller: {
               id: 'user234',
               name: 'John Smith',
               rating: 4.9
          },
          imageUrl: macbook,
          postedDate: '2024-04-10',
          isAvailable: true
     },
     {
          id: 'elec-002',
          title: 'iPad Pro 11"',
          brand: 'Apple',
          price: 53949,
          condition: 'Like New',
          category: 'electronics',
          description: '2022 iPad Pro with M1 chip. Includes Apple Pencil 2nd gen and Magic Keyboard.',
          details: {
               processor: 'Apple M1 chip',
               memory: '8GB RAM',
               storage: '256GB',
               display: '11-inch Liquid Retina',
               connectivity: 'Wi-Fi + Cellular',
               accessories: 'Apple Pencil 2, Magic Keyboard'
          },
          location: 'Los Angeles, CA',
          seller: {
               id: 'user567',
               name: 'Emily Brown',
               rating: 4.7
          },
          imageUrl: ipad,
          postedDate: '2024-04-09',
          isAvailable: true
     },
     {
          id: 'elec-003',
          title: 'Sony WH-1000XM4',
          brand: 'Sony',
          price: 16599,
          condition: 'Good',
          category: 'electronics',
          description: 'Premium noise-cancelling headphones. Great sound quality and battery life.',
          details: {
               type: 'Over-ear',
               connectivity: 'Bluetooth 5.0',
               batteryLife: 'Up to 30 hours',
               features: 'Active Noise Cancellation, Touch Controls',
               color: 'Black',
               warranty: '1 year remaining'
          },
          location: 'Chicago, IL',
          seller: {
               id: 'user890',
               name: 'Alex Johnson',
               rating: 4.8
          },
          imageUrl: headphones,
          postedDate: '2024-04-08',
          isAvailable: true
     }
]; 