import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Cart.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchCartItems(user.email);
    }
  }, [user]);

  const fetchCartItems = async (userEmail) => {
    try {
      const response = await axios.get(`http://localhost:5003/api/order/cart/${userEmail}`);
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:5003/api/order/cart/remove`, {
        data: {
          productId: productId,
          userEmail: user.email
        }
      });
      fetchCartItems(user.email);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleCheckout = () => {
    history.push('/checkout');
  };

  return (
    <div className="cart-container">
      <div className="cart-items">
        {cartItems.map((item, index) => (
          <CartItem key={`${item.productId}-${index}`} item={item} removeFromCart={removeFromCart} />
        ))}
      </div>
      <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

const CartItem = ({ item, removeFromCart }) => {
  const handleRemove = () => {
    removeFromCart(item.productId);
  };

  return (
    <div className="cart-item">
      <div className="item-details">
        {item.productImageURL && (
          <img src={item.productImageURL} alt={item.productName} className="item-image" />
        )}
        <p className="item-name">{item.productName}</p>
        <button className="remove-button" onClick={handleRemove}>Remove</button>
      </div>
    </div>
  );
};

export default CartPage;
