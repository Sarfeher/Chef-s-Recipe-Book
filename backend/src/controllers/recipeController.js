const Recipe = require('../models/recipeModel');
const mongoose = require('mongoose');

//get all recipes
const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find({}).sort({createdAt: -1});
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//get a single recipe
const getRecipe = async (req, res) => {
    const { id } = req.params;

if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid recipe ID' });
}
    try {
        const recipe = await Recipe.findById(id);

        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        res.status(200).json(recipe);

    } catch (error) {
        res.status(500).json({ error: error.message });
    } 
}

//create a recipe
const createRecipe = async (req, res) => {
    const { title, ingredients, instructions, cookingTime, imgURL } = req.body;

    let emptyFields = [];
    if (!title) {
        emptyFields.push('title');
    }
    if (!ingredients) {
        emptyFields.push('ingredients');
    }
    if (!instructions) {
        emptyFields.push('instructions');
    }
    if (!cookingTime) {
        emptyFields.push('cookingTime');
    }

    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields });
    }

    try {
        const recipe = await Recipe.create({ title, ingredients, instructions, cookingTime, imgURL });
        if (!recipe) {
            return res.status(400).json({ error: 'Failed to create recipe' });
        }
        res.status(200).json(recipe);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//delete a recipe
const deleteRecipe = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid recipe ID' });
    }
    try {
        const recipe = await Recipe.findByIdAndDelete(id);
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//update a recipe
const updateRecipe = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid recipe ID' });
    }

    try {
        const recipe = await Recipe.findByIdAndUpdate(id, req.body, { new: true });
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getRecipes,
    getRecipe,
    createRecipe,
    deleteRecipe,
    updateRecipe
}