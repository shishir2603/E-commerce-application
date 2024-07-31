import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Orders.css'; // Import CSS file for styling

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchPastOrders = async () => {
            try {
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    const response = await axios.get('http://localhost:5003/api/orders/orderPage', {
                        params: {
                            userID: parsedUser._id // Assuming user._id is available in localStorage
                        }
                    });
                    setOrders(response.data);
                }
            } catch (error) {
                console.error('Error fetching past orders:', error);
            }
        };

        fetchPastOrders();
    }, []); // Run once on component mount

    return (
        <div className="orders-container">
            <h1>My Past Orders</h1>
            {orders.length > 0 ? (
                <div className="order-list">
                    {orders.map(order => (
                        <div key={order._id} className="order-item">
                            <h2>Order ID: {order._id}</h2>
                            <div className="order-details">
                                <h3>Delivery Address:</h3>
                                <p>{order.deliveryAddress}</p>
                                <h3>Payment Option:</h3>
                                <p>{order.paymentOption}</p>
                                <h3>Products:</h3>
                                <ul>
                                    {order.products.map(product => (
                                        <li key={product.productId}>{product.productName}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No past orders found.</p>
            )}
        </div>
    );
};

export default OrdersPage;
