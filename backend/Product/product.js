const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {Product}= require("../db/Product");


const app = express();
app.use(cors());
const PORT = process.env.PORT || 5002;


app.use(express.json());


//Adding Product 

app.post('/api/product', async (req, res) => {
    try {
        const { productName, productDetails, price} = req.body;
        const product = new Product({
            productName,
            productDetails,
            price
            
        });
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        console.error('Error adding product:', err);
        res.status(500).send('Server error');
    }
});



// Getting Product id
app.get('/api/product/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.json(product);
    } catch (err) {
        console.error('Error fetching product details:', err);
        res.status(500).send('Server error');
    }
});



// Getting Product details

app.get('/api/product', async (req, res) => {
    try {
        const searchTerm = req.query.search;
        let query = {};

        if (searchTerm) {
            query = {
                $or: [
                    { productName: { $regex: searchTerm, $options: 'i' } },
                    { productDetails: { $regex: searchTerm, $options: 'i' } }
                ]
            };
        }

        const products = await Product.find(query);
        res.json(products);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).send('Server error');
    }
});





app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});