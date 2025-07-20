const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'Email registered' });
  }

  const user = await User.create({ username, email, password });
  res.status(201).json({
    token: generateToken(user._id),
    user: {
      username: user.username,
      email: user.email
    }
  });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  res.status(201).json({
    token: generateToken(user._id),
    user: {
      username: user.username,
      email: user.email
    }
  });
};

exports.getMe = async (req, res) => {
  // req.user diisi oleh middleware `protect`
  const user = req.user;

  res.json({
    id: user._id,
    email: user.email,
    username: user.username
  });
};
