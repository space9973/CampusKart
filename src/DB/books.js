import psychologyOfMoney from '../assets/Book/The_Psychology_of_Money1708363908191.jpg';
import atomicHabits from '../assets/Book/atomic_habit.jpeg';
import dataStructures from '../assets/Book/data_structure_python.jpeg';

export const books = [
     {
          id: 'book-001',
          title: 'The Psychology of Money',
          author: 'Morgan Housel',
          price: 14.99,
          condition: 'Like New',
          category: 'books',
          description: 'Timeless lessons on wealth, greed, and happiness. Only read once, in perfect condition.',
          details: {
               publisher: 'Harriman House',
               year: 2020,
               format: 'Paperback',
               language: 'English',
               pages: 256,
               isbn: '978-0857197689'
          },
          location: 'Boston, MA',
          seller: {
               id: 'user123',
               name: 'Sarah Wilson',
               rating: 4.8
          },
          imageUrl: psychologyOfMoney,
          postedDate: '2024-04-10',
          isAvailable: true
     },
     {
          id: 'book-002',
          title: 'Atomic Habits',
          author: 'James Clear',
          price: 12.99,
          condition: 'Good',
          category: 'books',
          description: 'Minor wear on corners, but pages are clean and unmarked. Great read on building better habits.',
          details: {
               publisher: 'Random House Business',
               year: 2018,
               format: 'Hardcover',
               language: 'English',
               pages: 320,
               isbn: '978-1847941831'
          },
          location: 'Seattle, WA',
          seller: {
               id: 'user456',
               name: 'Mike Thompson',
               rating: 4.9
          },
          imageUrl: atomicHabits,
          postedDate: '2024-04-09',
          isAvailable: true
     },
     {
          id: 'book-003',
          title: 'Data Structures and Algorithms in Python',
          author: 'Michael T. Goodrich',
          price: 45.99,
          condition: 'Very Good',
          category: 'books',
          description: 'Essential textbook for computer science students. Some highlighting in first three chapters.',
          details: {
               publisher: 'Wiley',
               year: 2013,
               format: 'Hardcover',
               language: 'English',
               pages: 768,
               isbn: '978-1118290274'
          },
          location: 'Austin, TX',
          seller: {
               id: 'user789',
               name: 'David Chen',
               rating: 4.7
          },
          imageUrl: dataStructures,
          postedDate: '2024-04-08',
          isAvailable: true
     }
]; 