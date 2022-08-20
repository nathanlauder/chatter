const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
    trim: true,
    maxlength: 50
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  recipients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('conversations', ConversationSchema);