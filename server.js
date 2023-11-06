const express = require('express');
const app = express();
const routes = require('./mealRoutes')
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

mongoose.set('strictQuery', false)

const PORT = process.env.PORT || 4000; 

app.use(express.json()); 
app.use(cors()); 
app.use('/api/v1/meals', routes);

const start = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_LINK);
        app.listen(PORT, console.log(`Server is listening on ${PORT}`));
    } catch (error) {
        console.log(error)
    }
};

start();
