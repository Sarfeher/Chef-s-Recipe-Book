import { useEffect, useState } from "react";
import RecipeDetails from "../components/RecipeDetails";

// Bento layout: each row sums to 6 columns so the grid tiles without ragged gaps.
// Row patterns: [wide(4) + std(2)] [tall(3) + tall(3)] [std(2) + std(2) + std(2)]
const slotPattern = [
    "card-wide", "card-std",
    "card-tall", "card-tall",
    "card-std", "card-std", "card-std",
];
const slotFor = (i) => slotPattern[i % slotPattern.length];

const Home = () => {
    const [recipes, setRecipes] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            const response = await fetch('/api/recipes');
            const json = await response.json();
            if (response.ok) {
                setRecipes(json);
            }
        };
        fetchRecipes();
    }, []);

    const sorted = recipes
        ? [...recipes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        : [];
    const [hero, ...rest] = sorted;

    return (
        <div className="home">
            {recipes && recipes.length === 0 && (
                <p className="empty-state" data-testid="empty-state">
                    No recipes yet. Use "Add recipe" to create your first one.
                </p>
            )}

            {recipes && recipes.length > 0 && (
                <div className="bento">
                    {hero && (
                        <div className="card-hero">
                            <RecipeDetails recipe={hero} variant="hero" badge="Latest" />
                        </div>
                    )}
                    {rest.map((recipe, i) => (
                        <div key={recipe._id} className={slotFor(i)}>
                            <RecipeDetails recipe={recipe} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
