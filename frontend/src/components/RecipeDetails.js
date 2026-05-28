import { Link } from "react-router-dom";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useParams } from "react-router-dom";

const RecipeDetails = ({ recipe }) => {
    const { id } = useParams();
    const isDetail = Boolean(id);

    const card = (
        <div className={isDetail ? "recipe-details-long" : "recipe-details"}>
            {recipe.imgURL && <img src={recipe.imgURL} alt={recipe.title} />}
            <h4>{recipe.title}</h4>

            {isDetail && (
                <>
                    <div className="ingredients-block">
                        <p className="ingredients-label">Ingredients</p>
                        <ul>
                            {recipe.ingredients.map((ingredient) => (
                                <li key={ingredient}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                    <p className="instructions">{recipe.instructions}</p>
                    <div className="meta">
                        <span>Cooking Time: {recipe.cookingTime} min</span>
                        <span>Added: {formatDistanceToNow(new Date(recipe.createdAt), { addSuffix: true })}</span>
                    </div>
                </>
            )}

            {!isDetail && (
                <p>Added: {formatDistanceToNow(new Date(recipe.createdAt), { addSuffix: true })}</p>
            )}
        </div>
    );

    if (isDetail) return card;

    return (
        <Link to={`/recipe/${recipe._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            {card}
        </Link>
    );
};

export default RecipeDetails;
