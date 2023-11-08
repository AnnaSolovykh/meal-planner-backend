const express = require('express');
const router = express.Router();
const {    
    getAllMeals, 
    getSingleMeal,
    createMeal, 
    deleteMeal, 
    editMeal 
} = require('../controllers/mealController');

router.route('/').get(getAllMeals).post(createMeal);
router.route('/:id').get(getSingleMeal).delete(deleteMeal).patch(editMeal);

module.exports = router;
