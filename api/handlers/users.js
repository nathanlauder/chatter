/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { isValidEmail, isValidUsername, isValidPassword } = require('./utils/validate');

const createNewUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    if (!isValidUsername(username)) {
      return res.status(400).json({
        error: 'Username must be between 5 and 30 characters'
      });
    }
    const hash = bcrypt.hashSync(password, 10);

    if (!isValidEmail(email)) {
      return res.status(400).json({
        error: 'Invalid email'
      });
    }

    const newUser = new User({ username, password: hash, email });
    const savedUser = await newUser.save();
    return res.status(201).json({
      username: savedUser.username,
      email: savedUser.email,
      _id: savedUser._id,
      createdAt: savedUser.createdAt,
      __v: savedUser.__v
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        error: 'Username or email already exists'
      });
    }
    return res.status(500).json({
      error: 'Internal server error'
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!isValidUsername(username)) {
      return res.status(400).json({
        error: 'Username must be between 5 and 30 characters'
      });
    }
    if (!isValidPassword(password)) {
      return res.status(400).json({
        error: 'Password must be between 10 and 50 characters'
      });
    }
    const user = await User.findOne({ username }).select('+password');
    if (!user) {
      return res.status(404).json({
        error: 'Invalid username or password'
      });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({
        error: 'Invalid username or password'
      });
    }
    return res.status(200).json({ _id: user._id, username: user.username });
  } catch (err) {
    return res.status(500).json({
      error: 'Internal server error'
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      });
    }
    // user.token = '';
    // await user.save();
    return res.status(200).json({
      message: 'User logged out'
    });
  } catch (err) {
    return res.status(500).json({
      error: 'Internal server error'
    });
  }
};

const findUser = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username || username === '' || username.length === 0) {
      return res.status(400).json({
        error: 'Username is required'
      });
    }
    if (username.length < 3) {
      return res.status(400).json({
        error: 'Username must be at least 3 characters to search'
      });
    }
    const users = await User.find({
      username: {
        $regex: `.*${username}.*`,
        $options: 'i'
      }
    });
    return res.status(200).send(users);
  } catch (err) {
    return res.status(500).json({
      error: 'Internal server error'
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || username === '' || username.length === 0) {
      return res.status(400).json({
        error: 'Username is required'
      });
    }
    if (!isValidUsername(username)) {
      return res.status(400).json({
        error: 'Username must be between 5 and 30 characters'
      });
    }
    if (!password || password === '' || password.length === 0 || password === null) {
      return res.status(400).json({
        error: 'Password is required'
      });
    }
    const user = await User.findOne({ username }).select('+password');
    if (user === null) {
      return res.status(404).json({
        error: `User with username ${username} not found`
      });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({
        error: 'Password verification failed. Unable to delete user'
      });
    }
    if (user === null) {
      return res.status(404).json({
        error: `User with username ${username} not found`
      });
    }
    await User.findOneAndDelete({ username });
    return res.status(200).json({
      message: `User with username ${username} deleted`
    });
  } catch (err) {
    return res.status(500).json({
      error: 'Internal server error'
    });
  }
};

const updateUsername = async (req, res) => {
  try {
    const { oldUsername, newUsername } = req.body;
    if (oldUsername === newUsername) {
      return res.status(400).json({
        error: 'Cannot update unchanged username'
      });
    }
    if (!oldUsername || oldUsername === '' || oldUsername.length === 0) {
      return res.status(400).json({
        error: 'Old username is required'
      });
    }
    if (!newUsername || newUsername === '' || newUsername.length === 0) {
      return res.status(400).json({
        error: 'New username is required'
      });
    }
    if (!isValidUsername(newUsername)) {
      return res.status(400).json({
        error: 'Username must be between 5 and 30 characters'
      });
    }

    const user = await User.findOneAndUpdate({ username: oldUsername }, { username: newUsername });
    if (user === null) {
      return res.status(404).json({
        error: `User with email ${oldUsername} not found`
      });
    }
    const updatedUser = await User.findOne({ username: newUsername }).select('-password -__v -createdAt');
    return res.status(201).json(updatedUser);
  } catch (err) {
    return res.status(500).json({
      error: 'Internal server error'
    });
  }
};

const updateEmail = async (req, res) => {
  try {
    const { oldEmail, newEmail } = req.body;
    if (oldEmail === newEmail) {
      return res.status(400).json({
        error: 'Cannot update unchanged email'
      });
    }
    if (!newEmail || newEmail === '' || newEmail.length === 0) {
      return res.status(400).json({
        error: 'New email is required'
      });
    }
    if (!oldEmail || oldEmail === '' || oldEmail.length === 0) {
      return res.status(400).json({
        error: 'Old email is required'
      });
    }
    if (!isValidEmail(newEmail)) {
      return res.status(400).json({
        error: 'Invalid email'
      });
    }
    const user = await User.findOneAndUpdate({ email: oldEmail }, { email: newEmail });
    if (user === null) {
      return res.status(404).json({
        error: `User with email ${oldEmail} not found`
      });
    }
    const updatedUser = await User.findOne({ email: newEmail }).select('-password -__v -createdAt');
    return res.status(201).json(updatedUser);
  } catch (err) {
    return res.status(500).json({
      error: 'Internal server error'
    });
  }
};

module.exports = {
  createNewUser,
  loginUser,
  logoutUser,
  findUser,
  deleteUser,
  updateUsername,
  updateEmail
};