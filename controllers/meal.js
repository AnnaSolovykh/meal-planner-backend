const Meal = require('../models/meal');
const asyncWrapper = require('../middleware/async-wrapper');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../errors');

const getAllMeals = asyncWrapper(async (req, res) => {
    const { title, isFavorite, type, sort } = req.query;
    const queryObject = { createdBy: req.user.userId };

    if (title) {
        queryObject.title = { $regex: title, $options: 'i' };
    }
    if (isFavorite !== undefined) {
        queryObject.isFavorite = isFavorite === 'true';
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

    const totalItems = await Meal.countDocuments(queryObject);
    const totalPages = Math.ceil(totalItems / limit);

    const meals = await result;
    res.status(StatusCodes.OK).json({ meals, totalPages, currentPage: page  });
});

const getSingleMeal = asyncWrapper(async (req, res, next) => {
    const { id: mealId } = req.params;
    const createdBy = req.user.userId; 
    const meal = await Meal.findOne({ _id: mealId, createdBy });
    if (!meal) {
        throw new NotFoundError('Such a meal does not exist');
    }
    res.status(StatusCodes.OK).json({ meal });
});

const createMeal = asyncWrapper(async (req, res) => {
    const createdBy = req.user.userId
    req.body.createdBy = createdBy;
    const ingredients = req.body.ingredients;
    if (!Array.isArray(ingredients) || ingredients.some(item => typeof item !== 'string')) {
        return res.status(400).json({ message: "Ingredients should contain text." });
    }

    const meal = await Meal.create(req.body)
    res.status(StatusCodes.CREATED).json({ meal })
});

const deleteMeal = asyncWrapper(async (req, res, next) => {
    const { id: mealId } = req.params;
    const createdBy = req.user.userId; 
    const meal = await Meal.findOneAndDelete({ _id: mealId, createdBy });
    if (!meal) {
        throw new NotFoundError('Such a meal does not exist');
    }
    res.status(StatusCodes.OK).send();
});

const editMeal = asyncWrapper(async (req, res, next) => {
    const { id: mealId }  = req.params;
    const createdBy = req.user.userId; 
    const meal = await Meal.findOneAndUpdate({ _id: mealId, createdBy }, req.body, {
            new: true,
            runValidators: true
        });
    if (!meal) {
        throw new NotFoundError('Such a meal does not exist');
    }
    res.status(StatusCodes.OK).json({ meal })
});

module.exports = {
    getAllMeals,
    getSingleMeal,
    createMeal,
    deleteMeal,
    editMeal
}