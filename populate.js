require('dotenv').config();

const mongoose = require('mongoose');

const Meal = require('./models/meal');
const jsonMeals = require('./meals.json');

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_LINK);
    await Meal.deleteMany();
    await Meal.create(jsonMeals);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
