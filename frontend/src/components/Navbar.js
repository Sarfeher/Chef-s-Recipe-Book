import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <header>
            <div className="container">
                <Link to="/">
                <img src="/bytes1.png" alt="Bytes & Bites Logo" className="navbar-logo"  />
                </Link>
                <h3 className="nav-slogan">Where Digital Flavors Meet Delicious Creations</h3>
                <Link to="/create"><button>Add recipe</button></Link>
            </div>
        </header>
    );
}

export default Navbar;