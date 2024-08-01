const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const {Order}=require("./Order_sch");
const {Cart}=require("./Cart");




const app = express();
app.use(express.json()); 
app.use(cors()); 
const PORT = process.env.PORT || 5003;



// Getting all orders
app.get('/api/orders/getOrders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).send('Server error');
    }
});




// Adding a New order
app.post('/api/orders/putOrders', async (req, res) => {
    try {
        const { customerName, items, total } = req.body;
        const order = new Order({
            customerName,
            items,
            total
        });
        await order.save();
        res.status(201).json(order);
    } catch (err) {
        console.error('Error adding order:', err);
        res.status(500).send('Server error');
    }
});





// Adding Product to cart
app.post('/api/order/cart/add', async (req, res) => {
    try {
        const { productId, productName,  price, userEmail } = req.body; 
        let cart = await Cart.findOne({ userEmail });

        if (!cart) {
            cart = new Cart({
                userEmail,
                items: [{ productId, productName, price }] 
            });
        } else {
            const existingCartItem = cart.items.find(item => item.productId.equals(productId));
            if (existingCartItem) {
                return res.status(400).send('Product already in cart');
            }
            cart.items.push({ productId, productName,  price }); 
        }

        await cart.save();
        res.status(200).send('Product added to cart successfully');
    } catch (err) {
        console.error('Error adding product to cart:', err);
        res.status(500).send('Server error');
    }
});





// Removing Product from cart
app.delete('/api/order/cart/remove', async (req, res) => {
    try {
        const { productId, userEmail } = req.body;
        const cart = await Cart.findOne({ userEmail });

        if (!cart) {
            return res.status(404).send('Cart not found');
        }

        cart.items = cart.items.filter(item => !item.productId.equals(productId));
        await cart.save();

        res.status(200).send('Product removed from cart successfully');
    } catch (err) {
        console.error('Error removing product from cart:', err);
        res.status(500).send('Server error');
    }
});






// Getting Cart Items
app.get('/api/order/cart/:userEmail', async (req, res) => {
    try {
        const userEmail = req.params.userEmail;
        const cart = await Cart.findOne({ userEmail });
        if (!cart) {
            return res.status(404).send('Cart not found');
        }
        res.json(cart.items); // Return only the items array
    } catch (err) {
        console.error('Error fetching cart items:', err);
        res.status(500).send('Server error');
    }
});






// Creating order (checkout)
app.post('/api/orders/create', async (req, res) => {
    try {
        const {
            userId,
            userName,
            products,
            total,
            deliveryAddress,
            paymentOption,
            cardDetails,
            upiDetails
        } = req.body;

        const order = new Order({
            userId,
            userName,
            products,
            total,
            deliveryAddress,
            paymentOption,
            cardDetails,
            upiDetails,
            status: 'Pending'
        });

        await order.save();
        res.status(201).json(order);
    } catch (err) {
        console.error('Error creating order:', err);
        res.status(500).send('Server error');
    }
});






app.get('/api/orders/orderPage', async (req, res) => {
    const { userID } = req.query; 
    try {
        const orders = await Order.find({ userId: userID }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});





app.get("/", async (req, res)=>{
    res.status(200).send("Server has started");
});


app.listen(5003, () => {
    console.log("Server is running on Port 5003");
});