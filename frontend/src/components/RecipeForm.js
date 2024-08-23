import { useState } from 'react'


const RecipeForm = () => {
    const [title, setTitle] = useState('');
    const [imgURL, setImgURL] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState('');
    const [cookingTime, setCookingTime] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const recipe = {title, imgURL, ingredients, instructions, cookingTime};

        const response = await fetch('/api/recipes', {
            method: 'POST',
            body: JSON.stringify(recipe),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setTitle('');
            setImgURL('');
            setIngredients([]);
            setInstructions('');
            setCookingTime('');
            setError(null);
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add new recipe </h3>
            <label>Recipe title:</label>
            <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
            <label>Picture URL:</label>
            <input type="text" onChange={(e) => setImgURL(e.target.value)} value={imgURL} />
            <label>Ingredients:</label>
            <input type="text" onChange={(e) => setIngredients(e.target.value)} value={ingredients} />
            <label>Instructions:</label>
            <input type="text" onChange={(e) => setInstructions(e.target.value)} value={instructions} />
            <label>Cooking time:</label>
            <input type="number" onChange={(e) => setCookingTime(e.target.value)} value={cookingTime} />
            <button>Save recipe</button>
            {error && <div className="error">{error}</div>}
        </form>
        
    );
}

export default RecipeForm;