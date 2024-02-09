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
        secure: false, // ensures the browser only sends the cookie over HTTPS - after deployment change it to true
        sameSite: 'strict',//controls its cross-site sending behavio
        httpOnly: true,// prevents client-side scripts from accessing the cookie
    },
};

module.exports = sessionOptions;