const router = require('express').Router();
const {
  createConversation,
  getConversations
} = require('../handlers/conversation');

router.post('/new', createConversation);
router.get('/find', getConversations);

module.exports = router;