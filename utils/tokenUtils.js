const TokenBlacklist = require('./models/TokenBlacklist'); //

const removeExpiredTokens = async () => {
  await TokenBlacklist.deleteMany({ expiresAt: { $lt: new Date() } });
};

module.exports = removeExpiredTokens;
