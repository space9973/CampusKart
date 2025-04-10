import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
     cors: {
          origin: "http://localhost:5173", // Update this with your React app's URL
          methods: ["GET", "POST"]
     }
});

// Store active users
const activeUsers = new Map();

// Store chat messages in memory (in production, use a database)
const chatMessages = new Map();

io.on('connection', (socket) => {
     console.log('User connected:', socket.id);

     // Handle user joining
     socket.on('join', ({ userId, username }) => {
          activeUsers.set(socket.id, { userId, username });
          console.log(`${username} joined the chat`);
     });

     // Handle new messages
     socket.on('sendMessage', ({ chatId, message }) => {
          const user = activeUsers.get(socket.id);
          if (!user) return;

          const newMessage = {
               id: Date.now().toString(),
               senderId: user.userId,
               senderName: user.username,
               text: message,
               timestamp: Date.now()
          };

          // Store the message
          if (!chatMessages.has(chatId)) {
               chatMessages.set(chatId, []);
          }
          chatMessages.get(chatId).push(newMessage);

          // Broadcast the message to all users in the chat
          io.emit(`message:${chatId}`, newMessage);
     });

     // Handle getting chat history
     socket.on('getChatHistory', ({ chatId }) => {
          const messages = chatMessages.get(chatId) || [];
          socket.emit(`chatHistory:${chatId}`, messages);
     });

     // Handle user disconnection
     socket.on('disconnect', () => {
          const user = activeUsers.get(socket.id);
          if (user) {
               console.log(`${user.username} left the chat`);
               activeUsers.delete(socket.id);
          }
     });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
}); 