require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

//mongo
const connectDB = require('./db/connect');
const session = require('express-session');
const sessionOptions = require('./db/session-config');

// security packages
const cors = require('cors');

//routes
const mealsRoutes = require('./routes/meal');
const authRouter = require('./routes/auth');

//middleware
const authenticateUser = require('./middleware/auth');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

const PORT = process.env.PORT || 4000; 

//seciruty
app.use(express.json()); 
app.set('trust proxy', 1);
app.use(session(sessionOptions));

//security
app.use(
    cors({
        origin: 'http://localhost:3000',
    })
);

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/meals', authenticateUser, mealsRoutes);

// error handler
app.use(notFound);
app.use(errorHandler);

const start = async() => {
    try {
        await connectDB(process.env.MONGODB_LINK)
        app.listen(PORT, console.log(`Server is listening on ${PORT}`));
    } catch (error) {
        console.log(error)
    }
};

start();
