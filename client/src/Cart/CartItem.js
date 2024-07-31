import React from 'react';

const CartItem = ({ item, removeFromCart }) => {
  const handleRemove = () => {
    removeFromCart(item.productId);
  };

  return (
    <div className="cart-item">
      <div className="item-details">
        <p className="item-name">{item.productName}</p>
        <button className="remove-button" onClick={handleRemove}>Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
