import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";  
import RecipeForm from "./components/RecipeForm";
import Recipe from "./pages/Recipe";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="pages">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<RecipeForm />} />
          <Route path="/recipe/:id" element={<Recipe />} />
          <Route path="/update/:id" element={<RecipeForm />} />
        </Routes>
        </div>
      </Router>
      
    </div>
  );
}

export default App;
