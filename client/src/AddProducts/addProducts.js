import React, { useState } from 'react';
import axios from 'axios';
import "./addProducts.css";

const AddProductForm = () => {
  const [productName, setProductName] = useState('');
  const [productDetails, setProductDetails] = useState('');
  const [productImageURL, setProductImageURL] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      productName,
      productDetails,
      productImageURL,
      price
    };

    try {
      await axios.post('http://localhost:5002/api/product', formData);
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="productDetails">Product Details:</label>
          <textarea
            id="productDetails"
            value={productDetails}
            onChange={(e) => setProductDetails(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="productImageURL">Image URL:</label> {}
          <input
            type="text"
            id="productImageURL"
            value={productImageURL}
            onChange={(e) => setProductImageURL(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label> {}
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;