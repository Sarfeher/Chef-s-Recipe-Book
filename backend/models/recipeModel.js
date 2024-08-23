const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    cookingTime: {
        type: Number,
        required: true
    },
    imgURL: {
        type: String,
        required: false
    }
}, {timestamps: true});

module.exports = mongoose.model('Recipe', recipeSchema);

