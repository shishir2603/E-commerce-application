import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import "./Navbar.css";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem('email'); // Remove user data from localStorage
        setIsAuthenticated(false); // Update authentication state
        history.push('/login'); // Redirect to login page after logout
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" className="navbar-logo">ECommerce</Link>
            </div>
            <ul className="navbar-nav">
                <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
                {isAuthenticated && <li className="nav-item"><Link to="/shop" className="nav-link">Update</Link></li>}
                {isAuthenticated && <li className="nav-item"><Link to="/products" className="nav-link">Products</Link></li>}
                {isAuthenticated && <li className="nav-item"><Link to="/about" className="nav-link">Update Profile</Link></li>}
                {isAuthenticated && <li className="nav-item"><Link to="/contact" className="nav-link">Cart</Link></li>}
            </ul>
            <div className="navbar-icons">
                <Link to="/search" className="navbar-icon"><i className="fas fa-search"></i></Link>
                <Link to="/cart" className="navbar-icon"><i className="fas fa-shopping-cart"></i></Link>
                {isAuthenticated ? (
                    <>
                        <Link to="/account" className="navbar-icon"><i className="fas fa-user"></i></Link>
                        <button onClick={handleLogout} className="navbar-icon"><i className="fas fa-sign-out-alt"></i> Logout</button>

                    </>
                ) : (
                    <Link to="/login" className="navbar-icon"><i className="fas fa-sign-in-alt"></i></Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
