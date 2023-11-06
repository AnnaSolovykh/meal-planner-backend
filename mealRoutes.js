const express = require('express');
const router = express.Router();
const {    
    getAllMeals, 
    createMeal, 
    deleteMeal, 
    editMeal 
} = require('./mealController');

router.route('/').get(getAllMeals).post(createMeal);
router.route('/:id').delete(deleteMeal).patch(editMeal);

module.exports = router;
