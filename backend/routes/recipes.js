const express = require('express');
const {getRecipe, getRecipes, deleteRecipe, updateRecipe, createRecipe} = require('../controllers/recipeController')
const router = express.Router();

//get all recipe
router.get('/', getRecipes)

//get single recipe
router.get('/:id', getRecipe)

//post a new recipe
router.post('/', createRecipe);

//delete a recipe
router.delete('/:id', deleteRecipe)

//update a recipe
router.patch('/:id', updateRecipe)


module.exports = router;