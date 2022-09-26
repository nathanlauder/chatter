const router = require('express').Router();
const { sendMessage, getMessages } = require('../handlers/messages');

router.post('/send', sendMessage);
router.post('/retrieve', getMessages);

module.exports = router;