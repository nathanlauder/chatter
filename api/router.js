const userRoutes = require('./routes/userRoutes');
const conversationRoutes = require('./routes/conversationRoutes');

const routeAllRoutes = (app) => {
  app.use('/api/v1/user', userRoutes);
  app.use('/api/v1/conversation', conversationRoutes);
};

module.exports = { routeAllRoutes };