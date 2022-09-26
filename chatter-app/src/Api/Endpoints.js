const base = 'http://localhost:8080/api/v1';

module.exports = {
  // user endpoints
  signup: `${base}/user/signup`,
  login: `${base}/user/login`,
  logout: `${base}/user/logout`,
  findUser: `${base}/user/find`,

  // conversation endpoints
  getConversations: `${base}/conversation/find?user=`,

  // message endpoints
  sendMessage: `${base}/message/send`,
  getMessages: `${base}/message/retrieve`
};