import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const RecipeForm = () => {
    const [title, setTitle] = useState('');
    const [imgURL, setImgURL] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [ingredientsInput, setIngredientsInput] = useState('');
    const [instructions, setInstructions] = useState('');
    const [cookingTime, setCookingTime] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    const deleteIngredient = (ingredientToDelete) => {
        setIngredients(ingredients.filter((ingredient) => ingredient !== ingredientToDelete));
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploadError(null);
        setUploading(true);

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('/api/uploads', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (!response.ok) {
                setUploadError(data.error || 'Upload failed');
            } else {
                setImgURL(data.url);
            }
        } catch (err) {
            setUploadError('Upload failed: ' + err.message);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const recipe = { title, imgURL, ingredients, instructions, cookingTime };

        const response = await fetch(`/api/recipes/${id ? id : ''}`, {
            method: id ? 'PATCH' : 'POST',
            body: JSON.stringify(recipe),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        } else {
            setTitle('');
            setImgURL('');
            setIngredients([]);
            setInstructions('');
            setCookingTime('');
            setIngredientsInput('');
            setEmptyFields([]);
            setError(null);
            navigate('/');
        }
    };

    useEffect(() => {
        if (id) {
            const fetchRecipe = async () => {
                const response = await fetch(`/api/recipes/${id}`);
                const json = await response.json();

                if (response.ok) {
                    setTitle(json.title);
                    setImgURL(json.imgURL);
                    setIngredients(json.ingredients);
                    setInstructions(json.instructions);
                    setCookingTime(json.cookingTime);
                }
            };

            fetchRecipe();
        }
    }, [id]);

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>{id ? 'Update Recipe' : 'Add New Recipe'}</h3>
            <label>Recipe title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Picture URL:</label>
            <input
                type="text"
                onChange={(e) => setImgURL(e.target.value)}
                value={imgURL}
                placeholder="Paste an image URL, or upload below"
            />

            <label>Or upload an image:</label>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                data-testid="image-upload"
            />
            {uploading && <p className="upload-status">Uploading...</p>}
            {uploadError && <p className="upload-status upload-error">{uploadError}</p>}
            {imgURL && !uploading && (
                <div className="image-preview">
                    <img src={imgURL} alt="Preview" />
                </div>
            )}

            <label>Ingredients:</label>
            <ul>
                {ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}<button className="material-symbols-outlined" onClick={() => deleteIngredient(ingredient)}>Delete</button> </li>
                ))}
            </ul>
            <input
                type="text"
                onChange={(e) => setIngredientsInput(e.target.value)}
                value={ingredientsInput}
                className={emptyFields.includes('ingredients') ? 'error' : ''}
            />
            <button onClick={(e) => {
                e.preventDefault();
                setIngredients([...ingredients, ingredientsInput]);
                setIngredientsInput('');
            }}>Add Ingredient</button>

            <label>Instructions:</label>
            <input
                type="text"
                onChange={(e) => setInstructions(e.target.value)}
                value={instructions}
                className={emptyFields.includes('instructions') ? 'error' : ''}
            />
            <label>Cooking time (in minutes):</label>
            <input
                type="number"
                onChange={(e) => setCookingTime(e.target.value)}
                value={cookingTime}
                min={0}
                className={emptyFields.includes('cookingTime') ? 'error' : ''}
            />
            <button>{id ? 'Update Recipe' : 'Save Recipe'}</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default RecipeForm;
