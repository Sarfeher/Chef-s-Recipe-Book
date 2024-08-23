import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <header>
            <div className="container">
                <Link to="/"> <h1>Chef's recipe book</h1> </Link>
                <Link to="/create"><h2>Add recipe</h2></Link>
            </div>
        </header>
    );
}

export default Navbar;