import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";  
import RecipeForm from "./components/RecipeForm";
/* import Recipes from "./pages/Recipes";
import RecipeDetails from "./pages/RecipeDetails"; */

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="pages">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<RecipeForm />} />
          {/* <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} /> */}
        </Routes>
        </div>
      </Router>
      
    </div>
  );
}

export default App;
