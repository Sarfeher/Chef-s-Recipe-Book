import { useEffect, useState } from "react";
import RecipeDetails from "../components/RecipeDetails";
import ConfirmModal from "../components/ConfirmModal";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Recipe = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const navigate = useNavigate();

    const openDeleteConfirm = () => setIsConfirmOpen(true);
    const closeDeleteConfirm = () => setIsConfirmOpen(false);

    const confirmDelete = async () => {
        await fetch('/api/recipes/' + id, { method: 'DELETE' });
        setIsConfirmOpen(false);
        navigate('/');
    };

    const handleGoBack = () => {
        navigate('/');
    };

    const updateRecipe = () => {
        navigate('/update/' + id);
    };

    useEffect(() => {
        const fetchRecipe = async () => {
            const response = await fetch('/api/recipes/' + id);
            const json = await response.json();
            if (response.ok) {
                setRecipe(json);
            }
        };
        fetchRecipe();
    }, [id]);

    return (
        <div className="recipe">
            {recipe && <RecipeDetails key={recipe.id} recipe={recipe} />}
            <button className="material-symbols-outlined" onClick={handleGoBack} data-testid="back-button">arrow_back</button>
            <button className="material-symbols-outlined" onClick={updateRecipe} data-testid="update-button">update</button>
            <button className="material-symbols-outlined button-danger" onClick={openDeleteConfirm} data-testid="delete-button">delete</button>

            <ConfirmModal
                isOpen={isConfirmOpen}
                title="Delete recipe?"
                message="This will permanently remove the recipe. This action cannot be undone."
                confirmLabel="Delete"
                onConfirm={confirmDelete}
                onCancel={closeDeleteConfirm}
            />
        </div>
    );
};

export default Recipe;
