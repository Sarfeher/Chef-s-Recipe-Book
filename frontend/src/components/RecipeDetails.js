import { Link } from "react-router-dom";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useParams } from "react-router-dom";

const RecipeDetails = ({ recipe, variant, badge, servings: servingsOverride }) => {
    const { id } = useParams();
    const isDetail = Boolean(id);
    const isHero = variant === "hero";
    // On the detail page the parent owns the live servings state (so the stepper
    // can update it). Everywhere else we just display whatever the recipe stored.
    const displayServings = servingsOverride ?? recipe.servings;

    const card = (
        <div className={`${isDetail ? "recipe-details-long" : "recipe-details"}${isHero ? " is-hero" : ""}`}>
            {badge && !isDetail && <span className="hero-badge">{badge}</span>}
            {recipe.imgURL && <img src={recipe.imgURL} alt={recipe.title} />}
            <h4>{recipe.title}</h4>

            {isDetail && (
                <>
                    <div className="ingredients-block">
                        <p className="ingredients-label">
                            Ingredients{displayServings ? ` · for ${displayServings} servings` : ""}
                        </p>
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
        <Link to={`/recipe/${recipe._id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
            {card}
        </Link>
    );
};

export default RecipeDetails;
