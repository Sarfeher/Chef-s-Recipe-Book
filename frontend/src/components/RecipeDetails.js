import { Link } from "react-router-dom";

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useParams } from "react-router-dom";

const RecipeDetails = ({ recipe }) => {
    const { id } = useParams();
    return (
        
        <Link to={`/recipe/${recipe._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className={id ?"recipe-details-long" : "recipe-details"}>
                <h4>{recipe.title}</h4>
                <img src={recipe.imgURL} alt={recipe.title} />
                {id && (<p><ul><strong> Ingredients: {recipe.ingredients.map((ingredient) => {
                    return <li key={ingredient}>{ingredient}</li>
                })} </strong></ul>
                <p>{recipe.instructions}</p>
                <p>Cooking Time: {recipe.cookingTime}</p></p>)}
                <p>Added: {formatDistanceToNow(new Date(recipe.createdAt), {addSuffix : true})}</p>
            </div>
        </Link>
);
}

export default RecipeDetails;