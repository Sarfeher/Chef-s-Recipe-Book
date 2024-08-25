import { Link } from "react-router-dom";

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const RecipeDetails = ({ recipe }) => {
    return (
        <Link to={`/recipe/${recipe._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="recipe-details">
                <h4>{recipe.title}</h4>
                <img src={recipe.imgURL} alt={recipe.title} />
                <p><strong> Ingredients: {recipe.ingredients} </strong></p>
                    
                <p>{recipe.instructions}</p>
                <p>Cooking Time: {recipe.cookingTime}</p>
                <p>Added: {formatDistanceToNow(new Date(recipe.createdAt), {addSuffix : true})}</p>
            </div>
        </Link>
    );
}

export default RecipeDetails;