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

app.use(express.json()); 

//security
app.set('trust proxy', 1);
app.use(session(sessionOptions));

const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');
const hpp = require('hpp');

//security
app.use(
    cors({
        origin: 'http://localhost:3005',
    })
);

app.use(
    rateLimiter({ //enforces rate limits on incoming requests to prevent brute-force 
        windowMs: 15 * 60 * 1000, 
        max: 100, 
    })
);
app.use(helmet()); //sets various HTTP headers to protect against common web vulnerabilities
app.use(xss()); //protects against cross-site scripting attacks by sanitizing user input and content.
app.use(hpp()); //protects against HTTP Parameter Pollution, ensuring only the first parameter is processed to prevent exploiting query parameters

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
