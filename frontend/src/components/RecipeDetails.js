const RecipeDetails = ({recipe}) => {
    return ( 
        <div className="recipe-details">
            <h4>{recipe.title}</h4>
            <img src={recipe.imgURL} alt={recipe.title}/>
            <p><strong> Ingredients: {recipe.ingredients.join(', ')} </strong></p>
            <p>{recipe.instructions}</p>
            <p>Cooking Time: {recipe.cookingTime}</p>
            <p>{recipe.createdAt}</p>
        </div>
    );
}
 
export default RecipeDetails;