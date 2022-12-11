const mongoose = require('mongoose');
const express = require('express');
const socket = require('socket.io');

const cors = require('cors');
const { routeAllRoutes } = require('./router');

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());
const uri = `${process.env.DB_URI}`;
const port = process.env.PORT || 3000;

const connect = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }
};

connect();
routeAllRoutes(app);

// eslint-disable-next-line no-unused-vars
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const io = socket(server, {
  cors: {
    origin: `http://localhost:3000`, // frontends port
    credentials: true,
    methods: ['GET', 'POST'],
    transports: ['websocket', 'polling']
  },
  allowEIO3: true
});

const usersOnline = new Map();
const activeChats = new Map();

io.on('connection', (sock) => {
  global.chatSocket = sock;

  sock.on('connect-user', (userId) => {
    console.log(`Connection request recieved from user: ${userId}`);
    usersOnline.set(userId, sock.id);
  });

  sock.on('connect-chat', (chatId) => {
    console.log(`Connecting ${chatId} chat to sockets`);
    // if (!activeChats.get(chatId))
    activeChats.set(chatId, sock.id);
    console.log(`ID of socket for connected chat: ${activeChats.get(chatId)}`);
    return activeChats.get(chatId);
  });

  sock.on('send-msg', (data) => {
    console.log(data);
    const {
      conversation, sender, text, timeStamp
    } = data;
    console.log(`Message "${text}" being sent to ${conversation} from ${sender} at ${timeStamp}`);
    // need to figure out how to do for group convo
    const activeChatSocket = activeChats.get(conversation);
    console.log(`Active chat: ${activeChatSocket}`);
    if (activeChatSocket) sock.to(activeChatSocket).emit('receive-msg', data);
  });
});

module.exports = app;