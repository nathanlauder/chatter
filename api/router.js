const userRoutes = require('./routes/userRoutes');
const conversationRoutes = require('./routes/conversationRoutes');
const messageRoutes = require('./routes/messageRoutes');

const routeAllRoutes = (app) => {
  app.use('/api/v1/user', userRoutes);
  app.use('/api/v1/conversation', conversationRoutes);
  app.use('/api/v1/message', messageRoutes);
};

module.exports = { routeAllRoutes };