/* eslint-disable no-param-reassign */

const { ObjectId } = require('mongoose').Types;
const isValidId = require('mongoose').Types.ObjectId.isValid;
const Conversation = require('../models/Conversation');
const User = require('../models/User');

const censorConversation = (conversation) => {
  const censoredConversation = conversation;
  censoredConversation.creator.email = undefined;
  censoredConversation.creator.__v = undefined;

  censoredConversation.recipients.forEach((recipient) => {
    recipient.email = undefined;
    recipient.__v = undefined;
  });
  return censoredConversation;
};

const filterForSameRecipients = (conversationsCreated, validRecipients) => {
  const sameNumberRecipients = conversationsCreated.filter((conversation) => {
    if (conversation.recipients.length !== validRecipients.length) {
      return false;
    }
    return true;
  });

  const validAsString = validRecipients.map((recipient) => recipient.toString());
  const sameRecipients = sameNumberRecipients
    .filter((conversation) => conversation.recipients
      .filter((recipient) => {
        const val = validAsString.includes(recipient.toString());
        return val;
      }));
  return sameRecipients;
};

const getConversations = async (req, res) => {
  const { user } = req.query;
  if (!user || !isValidId(user)) {
    return res.status(400).json({
      error: 'Invalid creator provided'
    });
  }
  const conversationsCreated = await Conversation.find({ creator: ObjectId(user) }).populate('creator recipients');
  const conversationsReceived = await Conversation.find({ recipients: ObjectId(user) }).populate('creator recipients');
  if (conversationsCreated === null && conversationsReceived === null) {
    return res.status(404).json({
      error: 'No conversations found'
    });
  }
  const conversations = [...conversationsCreated, ...conversationsReceived];
  const censoredConversations = conversations
    .map((conversation) => censorConversation(conversation));

  return res.status(200).json(censoredConversations);
};

const createConversation = async (req, res) => {
  const { title, creator, recipients } = req.body;

  if ((!title || title.length === 0) ||
      (!creator || creator.length === 0) ||
      (!recipients || recipients.length === 0)) {
    return res.status(400).json({
      error: 'Please provide creator and recipients'
    });
  }
  if (!isValidId(creator)) {
    return res.status(400).json({
      error: 'Please provide a valid creator'
    });
  }

  const creatorId = ObjectId(creator);
  const validCreator = await User.findById(creatorId);
  const uniqueRecipients = [...new Set(recipients)];

  const promises = uniqueRecipients.map((recipient) => {
    if (!isValidId(recipient)) {
      return res.status(400).json({
        error: 'Invalid recipient id provided'
      });
    }
    const r = ObjectId(recipient);
    return User.findById(r);
  });

  const results = await Promise.all(promises);
  if (results.includes(null)) {
    return res.status(400).json({
      error: 'Invalid recipient provided'
    });
  }

  const validRecipients = results.map((recipient) => recipient._id);

  const conversationsCreated = await Conversation.find({ creator: ObjectId(creatorId) });

  const sameRecipients = filterForSameRecipients(conversationsCreated, validRecipients);

  if (sameRecipients.length > 0) {
    const alreadyCreated = await Conversation.findById(ObjectId(sameRecipients[0]._id)).populate('creator recipients');
    censorConversation(alreadyCreated);
    return res.status(200).json(alreadyCreated);
  }
  const conversation = new Conversation({
    title,
    creator: validCreator,
    recipients: validRecipients
  });

  const savedConversation = await conversation.save();
  const populatedConversation = await savedConversation.populate('creator recipients');
  censorConversation(populatedConversation);
  return res.status(201).json(populatedConversation);
};

module.exports = { createConversation, getConversations };