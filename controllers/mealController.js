const Meal = require('../models/mealModel');
const asyncWrapper = require('../middleware/asyncWrapper');
const { createCustomError } = require('../errors/customError');

const getAllMeals = asyncWrapper(async (req, res) => {
    const { title, favorite, type, sort } = req.query;
    const queryObject = {};

    if (title) {
        queryObject.title = { $regex: title, $options: 'i' };
    }
    if (favorite) {
        queryObject.favorite = favorite === 'true'? true : false;
    }
    if (type) {
        queryObject.type = type;
    }

    let result = Meal.find(queryObject);
    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    } else {
        result = result.sort('createdAt');
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    const meals = await result;
    res.status(200).json({ meals });
});

const getSingleMeal = asyncWrapper(async (req, res, next) => {
    const { id: mealId } = req.params;
    const meal = await Meal.findOne({ _id: mealId });
    if (!meal) {
        return next(createCustomError('Such a meal does not exist', 404));
    }
    res.status(200).json({ meal });
});

const createMeal = asyncWrapper(async (req, res) => {
    const meal = await Meal.create(req.body)
    res.status(201).json({ meal })
});

const deleteMeal = asyncWrapper(async (req, res, next) => {
    const { id: mealId } = req.params;
    const meal = await Meal.findOneAndDelete({ _id: mealId });
    if (!meal) {
        return next(createCustomError('Such a meal does not exist', 404));
    }
    res.status(200).send();
});

const editMeal = asyncWrapper(async (req, res, next) => {
    const { id: mealId }  = req.params;
    const meal = await Meal.findOneAndUpdate({ _id: mealId }, req.body, {
            new: true,
            runValidators: true
        });
    if (!meal) {
        return next(createCustomError('Such a meal does not exist', 404));
    }
    res.status(200).json({ meal })
});

module.exports = {
    getAllMeals,
    getSingleMeal,
    createMeal,
    deleteMeal,
    editMeal
}