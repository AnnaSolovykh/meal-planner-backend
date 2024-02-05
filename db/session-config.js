const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
    uri: process.env.MONGODB_LINK,
    collection: 'sessions',
});
store.on('error', (error) => {
    console.log('MongoDBStore error:', error);
});

const sessionOptions= {
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: store,
    cookie: {
        // Ensures the browser only sends the cookie over HTTPS
        secure: false, // once its deployment change it to true
        sameSite: 'strict',
    },
};

module.exports = sessionOptions;