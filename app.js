const express = require('express');
const app = express();
const routes = require('./routes/meal')
const mongoose = require('mongoose');
const cors = require('cors');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');
require('dotenv').config();

mongoose.set('strictQuery', false)

const PORT = process.env.PORT || 4000; 

app.use(express.json()); 
app.use(
    cors({
        origin: 'http://localhost:3005',
    })
);

app.use('/api/v1/meals', routes);
app.use(notFound);
app.use(errorHandler);

const start = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_LINK);
        app.listen(PORT, console.log(`Server is listening on ${PORT}`));
    } catch (error) {
        console.log(error)
    }
};

start();
