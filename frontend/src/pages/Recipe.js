import { useEffect, useState } from "react";
import RecipeDetails from "../components/RecipeDetails";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Recipe = () => {
    const {id} = useParams();
    const [recipe, setRecipe] = useState(null);
    const navigate = useNavigate();
    const handleDelete = () => {
        fetch('/api/recipes/' + id, {
            method: 'DELETE'
        });
        navigate('/');
    }

    const handleGoBack = () => {
        navigate('/');
    }

    const updateRecipe = () => {
        navigate('/update/' + id);
    }

    useEffect(() => {
        const fetchRecipe = async () => {
            const response = await fetch('/api/recipes/' + id);
            const json = await response.json();
            if (response.ok){
                setRecipe(json);
            }
        }
        fetchRecipe();
    }, [id]);
    return (
        <div className="recipe">
                {recipe && <RecipeDetails key={recipe.id} recipe={recipe} />}
                <button className="material-symbols-outlined" onClick={handleDelete}>Delete</button> 
                <button className="material-symbols-outlined" onClick={handleGoBack}>arrow_back</button> 
                <button className="material-symbols-outlined" onClick={updateRecipe}>update</button> 
        </div>
    );
}

export default Recipe;