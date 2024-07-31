import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Import the CSS file

function HomePage() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user information from localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
        }
    }, []);

    return (
        <div className="container"> {/* Apply container class */}
            <h1 className="heading">Welcome to the Profile Page, {user && user.name}!</h1>
            {user && (
                <div className="user-info"> {/* Apply user-info class */}
                    <h2>User Information:</h2>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <div className="button-container"> {/* Apply button-container class */}
                        {/* Option to update user details */}
                        <Link to="/update-profile">
                            <button>Update</button>
                        </Link>
                        {/* Option to view past orders */}
                        <Link to="/past-orders">View Past Orders</Link>
                        {/* Option to add a product */}
                        <Link to="/addProduct">
                            <button>Add Product</button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default HomePage;
