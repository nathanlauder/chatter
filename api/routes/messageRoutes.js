const router = require('express').Router();
const { sendMessage } = require('../handlers/messages');

router.post('/send', sendMessage);

module.exports = router;