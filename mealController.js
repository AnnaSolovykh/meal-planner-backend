const Meal = require('./mealModel');
const asyncWrapper = require('./middleware/asyncWrapper')

const getAllMeals = asyncWrapper(async (req, res) => {
    const meals = await Meal.find({});
    res.status(200).json({ meals });
});

const getSingleMeal = asyncWrapper(async (req, res) => {
    const { id: mealId } = req.params;
    const meal = await Meal.findOne({ _id: mealId });
    res.status(200).json({ meal });
});

const createMeal = asyncWrapper(async (req, res) => {
    const meal = await Meal.create(req.body)
    res.status(201).json({ meal })
});

const deleteMeal = asyncWrapper(async (req, res) => {
    const { id: mealId } = req.params;
    const meal = await Meal.findOneAndDelete({ _id: mealId });
    res.status(200).json({ meal: null, status: "success" });
});

const editMeal = asyncWrapper(async (req, res) => {
    const { id: mealId }  = req.params;
    const meal = await Meal.findOneAndUpdate({ _id: mealId }, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({ meal })
});

module.exports = {
    getAllMeals,
    getSingleMeal,
    createMeal,
    deleteMeal,
    editMeal
}