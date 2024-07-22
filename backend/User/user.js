
const {User}=require("../db/User");
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});




// Route for login
app.post('/api/user/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw Error('Email not registered');
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw Error('Incorrect password');
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route for signup
app.post('/api/user/signup', async (req, res) => {
    const { email, password, name, phoneNumber, address } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const user = await User.create({ email, password: hashedPassword, name, phoneNumber, address });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});




app.put('/api/user/update/:userId', async (req, res) => {
    const userId = req.params.userId;
    console.log('User ID:', userId);
    const { name, phoneNumber, address } = req.body;
    try {
        
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Update user properties
        if (name) user.name = name;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (address) user.address = address;
        
        // Save the updated user
        user = await user.save();

        res.status(200).json(user);
    } catch (error) {
        console.error('Error updating user:', error); // Log any errors
        res.status(400).json({ error: error.message });
    }
});




// Route for fetching user details by email
app.get('/api/user/details/:email', async (req, res) => {
    const email = req.params.email;
    try {
        // Find the user by email
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Return user details
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(5001,()=>{console.log("User server running...")});