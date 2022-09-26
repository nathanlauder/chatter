const isValidId = require('mongoose').Types.ObjectId.isValid;
const Message = require('../models/Message');

const sendMessage = async (req, res) => {
  try {
    const { conversationId, senderId, text } = req.body;
    if (!conversationId || !isValidId(conversationId)) {
      return res.status(404).json({
        error: 'Invalid conversation id provided'
      });
    }
    if (!senderId || !isValidId(senderId)) {
      return res.status(404).json({
        error: 'Invalid sender id provided'
      });
    }
    if (!text) {
      return res.status(404).json({
        error: 'text field is required'
      });
    }
    const newMessage = new Message({
      conversation: conversationId,
      sender: senderId,
      text
    });
    const savedMessage = await newMessage.save();
    return res.status(201).json(savedMessage);
  } catch (err) {
    return res.status(500).json({
      error: 'Internal server error'
    });
  }
};

const getMessages = async (req, res) => {
  const { conversationId } = req.body;
  if (!conversationId || !isValidId(conversationId)) {
    return res.status(400).json({
      error: 'Invalid conversation id provided'
    });
  }

  try {
    const messages = await Message.find({ conversation: conversationId });
    return res.status(200).json(messages);
  } catch (err) {
    return res.status(500).json({
      error: 'Internal server error'
    });
  }
};

module.exports = {
  sendMessage,
  getMessages
};