import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateProfilePage({ history }) {
    const [formData, setFormData] = useState({
        _id: '',
        name: '',
        email: '',
        phoneNumber: '',
        address: '',
    });

    useEffect(() => {
        // Fetch email from localStorage
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            // Fetch user details based on email
            axios.get(`http://localhost:5001/api/user/details/${storedEmail}`)
                .then(response => {
                    const user = response.data;
                    console.log('User data:', user); // Check user data in console
                    setFormData({
                        ...formData,
                        _id: user._id,
                        email: user.email,
                        name: user.name,
                        phoneNumber: user.phoneNumber,
                        address: user.address,
                    });
                })
                .catch(error => {
                    console.error('Error fetching user details:', error);
                });
        }
    }, []); // Empty dependency array to run the effect only once on component mount

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5001/api/user/update/${formData._id}`, formData);
            console.log(response.data);
            alert('Updated details successfully!'); // Show success alert
            history.push('/');  // 2000 milliseconds delay (2 seconds)
        } catch (error) {
            console.error('Error updating user:', error);
            if (error.response) {
                console.log(error.response.data);
            }
        }
    };

    return (
        <div>
            <h1>Update Profile Information</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled // Disable editing of email field
                />
                <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                />
                <button type="submit">Update</button>
            </form>
            {/* Render email for testing */}
            <p>Email: {formData.email}</p>
            <button onClick={() => history.push('/')}>Back to Home</button>
        </div>
    );
}

export default UpdateProfilePage;
