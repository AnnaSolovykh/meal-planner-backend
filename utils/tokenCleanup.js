const cron = require('node-cron');
const { removeExpiredTokens } = require('./tokenUtils');

cron.schedule('0 0 * * *', async () => {
  await removeExpiredTokens();
});
