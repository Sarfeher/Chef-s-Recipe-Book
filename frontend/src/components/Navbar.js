import { Link } from "react-router-dom";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
    return (
        <header>
            <div className="container">
                <Link to="/" className="brand-link">
                    <Logo />
                    <span className="brand-name">bytes &amp; bites</span>
                </Link>
                <h3 className="nav-slogan">Where Digital Flavors Meet Delicious Creations</h3>
                <div className="nav-actions">
                    <ThemeToggle />
                    <Link to="/create"><button>Add recipe</button></Link>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
