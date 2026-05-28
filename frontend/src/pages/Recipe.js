import { useEffect, useState } from "react";
import RecipeDetails from "../components/RecipeDetails";
import ConfirmModal from "../components/ConfirmModal";
import { useParams, useNavigate } from "react-router-dom";

const ArrowBackIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
);
const EditIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
);
const PrintIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6z" />
    </svg>
);
const TrashIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z" />
    </svg>
);

const Recipe = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [servings, setServings] = useState(null);

    const openDeleteConfirm = () => setIsConfirmOpen(true);
    const closeDeleteConfirm = () => setIsConfirmOpen(false);

    const confirmDelete = async () => {
        await fetch('/api/recipes/' + id, { method: 'DELETE' });
        setIsConfirmOpen(false);
        navigate('/');
    };

    const handleGoBack = () => navigate('/');
    const updateRecipe = () => navigate('/update/' + id);
    const handlePrint = () => window.print();

    useEffect(() => {
        const fetchRecipe = async () => {
            const response = await fetch('/api/recipes/' + id);
            const json = await response.json();
            if (response.ok) {
                setRecipe(json);
                setServings(typeof json.servings === 'number' ? json.servings : 4);
            }
        };
        fetchRecipe();
    }, [id]);

    const decServings = () => setServings((s) => Math.max(1, s - 1));
    const incServings = () => setServings((s) => Math.min(99, s + 1));

    return (
        <div className="recipe">
            <div className="recipe-toolbar">
                <button onClick={handleGoBack} data-testid="back-button">
                    <ArrowBackIcon /> Back
                </button>
                <button onClick={updateRecipe} data-testid="update-button">
                    <EditIcon /> Edit
                </button>
                <button onClick={handlePrint} data-testid="print-button">
                    <PrintIcon /> Print
                </button>

                {recipe && servings !== null && (
                    <div className="servings-stepper" data-testid="servings-stepper">
                        <button onClick={decServings} disabled={servings <= 1} aria-label="Decrease servings" data-testid="servings-decrement">−</button>
                        <span className="servings-value" data-testid="servings-value">{servings} {servings === 1 ? 'serving' : 'servings'}</span>
                        <button onClick={incServings} disabled={servings >= 99} aria-label="Increase servings" data-testid="servings-increment">+</button>
                    </div>
                )}

                <span className="spacer" />

                <button className="button-danger" onClick={openDeleteConfirm} data-testid="delete-button">
                    <TrashIcon /> Delete
                </button>
            </div>

            {recipe && <RecipeDetails recipe={recipe} servings={servings} />}

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
