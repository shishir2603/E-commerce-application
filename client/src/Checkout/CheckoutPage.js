// Import necessary modules
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Checkout.css'; // Import CSS file for styling

const CheckoutPage = () => {
    const [user, setUser] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [paymentOption, setPaymentOption] = useState('cash');
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [bankName, setBankName] = useState('');
    const [upiPin, setUpiPin] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            fetchCartItems(parsedUser.email);
        }
    }, []);

    const fetchCartItems = async (userEmail) => {
        try {
            const response = await axios.get(`http://localhost:5003/api/order/cart/${userEmail}`);
            setCartItems(response.data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.quantity * item.price), 0);
    };

    const handleCheckout = async () => {
        try {
            const checkoutData = {
                userId: user._id, 
                userName: user.name,
                products: cartItems.map(item => ({
                    productId: item.productId,
                    productName: item.productName,
                    quantity: item.quantity, 
                    price: item.price 
                })),
                total: calculateTotal(), 
                deliveryAddress,
                paymentOption,
                cardDetails: paymentOption === 'debitCard' || paymentOption === 'creditCard' ? {
                    cardNumber,
                    cardHolderName,
                    expiryDate,
                    cvv
                } : null,
                upiDetails: paymentOption === 'UPI' ? {
                    bankName,
                    pin: upiPin
                } : null
            };

            const response = await axios.post('http://localhost:5003/api/orders/create', checkoutData);
            console.log('Checkout successful:', response.data);

            setDeliveryAddress('');
            setPaymentOption('cash');
            setCardNumber('');
            setCardHolderName('');
            setExpiryDate('');
            setCvv('');
            setBankName('');
            setUpiPin('');
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };

    return (
        <div className="checkout-container">
            <h1>Checkout</h1>
            {cartItems && cartItems.length > 0 ? (
                <div>
                    <h2>Products in Cart:</h2>
                    <ul>
                        {cartItems.map((item, index) => (
                            <li key={`${item.productId}-${index}`}>{item.productName}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No items in cart</p>
            )}
            <div className="checkout-form">
                <label htmlFor="deliveryAddress">Delivery Address:</label>
                <input type="text" id="deliveryAddress" value={deliveryAddress} onChange={e => setDeliveryAddress(e.target.value)} />

                <label htmlFor="paymentOption">Payment Option:</label>
                <select id="paymentOption" value={paymentOption} onChange={e => setPaymentOption(e.target.value)}>
                    <option value="cash">Cash</option>
                    <option value="UPI">UPI</option>
                    <option value="debitCard">Debit Card</option>
                    <option value="creditCard">Credit Card</option>
                </select>

                {paymentOption === 'debitCard' || paymentOption === 'creditCard' ? (
                    <div>
                        <label htmlFor="cardNumber">Card Number:</label>
                        <input type="text" id="cardNumber" value={cardNumber} onChange={e => setCardNumber(e.target.value)} />

                        <label htmlFor="cardHolderName">Card Holder Name:</label>
                        <input type="text" id="cardHolderName" value={cardHolderName} onChange={e => setCardHolderName(e.target.value)} />

                        <label htmlFor="expiryDate">Expiry Date:</label>
                        <input type="text" id="expiryDate" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} />

                        <label htmlFor="cvv">CVV:</label>
                        <input type="text" id="cvv" value={cvv} onChange={e => setCvv(e.target.value)} />
                    </div>
                ) : paymentOption === 'UPI' ? (
                    <div>
                        <label htmlFor="upiPin">UPI PIN:</label>
                        <input type="password" id="upiPin" value={upiPin} onChange={e => setUpiPin(e.target.value)} />
                    </div>
                ) : null}
            </div>
            <button onClick={handleCheckout}>Proceed to Checkout</button>
        </div>
    );
};

export default CheckoutPage;
