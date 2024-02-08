const mongoose = require('mongoose');

const MealSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: [true, 'name must be provided'],
        trim: true,
        maxlength: [40, 'the name of the meal should not be longer than 40 characters']
    },
    type: {
        type: String,
        enum: [
            'breakfast',
            'snack',
            'lunch',
            'dinner',
        ],
        required: [true, 'type of the meal must be provided'],
    },
    isFavorite: {
        type: Boolean,
        default: false
    },
    calories: {
        type: Number,
        required: false,
        min: [0, 'Calories must be a positive number'],
        max: [5000, 'Calories must be less than 5000'] 
    },
    ingredients: {
        type: [String],
        required: false,
        validate: {
            validator: function(value) {
                const doesNotExceedMaxItems = value.length <= 20;
                return doesNotExceedMaxItems;
            },
            message: 'Please list up to 20 ingredients, each as a separate item.'
        }
    },
    link: {
        type: String,
        required: [true, 'Please provide the link to the recipe'],
        validate: {
            validator: function(v) {
                return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(v);
            },
            message: 'Please provide a valid URL'
        }
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user']
    },
}, { timestamps: true });

module.exports = mongoose.model('Meal', MealSchema);
