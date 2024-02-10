const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');
const TokenBlacklist = require('../models/tokenBlacklist');

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Authentication invalid');
  }

  const token = authHeader.split(' ')[1];

  const payload = jwt.verify(token, process.env.JWT_SECRET);
  if (payload.exp <= Date.now() / 1000) {
    throw new UnauthenticatedError('Token has expired');
  }

  const isBlacklisted = await TokenBlacklist.findOne({ token });
  if (isBlacklisted) {
    throw new UnauthenticatedError('Token has been invalidated');
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid');
  }
};

module.exports = auth;
