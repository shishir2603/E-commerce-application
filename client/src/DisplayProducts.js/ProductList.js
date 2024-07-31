import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './displayProduct.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/product');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();

    // Retrieve user from local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const addToCart = async (productId, productName, productImageURL, productPrice) => {
    try {
      const userEmail = user.email;
      const userId = user._id;
      await axios.post('http://localhost:5003/api/order/cart/add', {
        userId,
        productId,
        productName,
        productImageURL,
        productPrice, // Include product price in the request
        userEmail
      });
      alert('Product added to cart successfully');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Product already in cart');
    }
  };

  const filteredProducts = products.filter(product =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="product-list-container">
      <h2>Product List</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="product-list">
        {filteredProducts.map(product => (
          <div key={product._id} className="product-item">
            {product.productImageURL && (
              <img
                src={product.productImageURL}
                alt="Product"
                className="product-image"
              />
            )}
            <div className="product-item-content">
              <p className="product-price">Price: ${product.price}</p>
              <h3>{product.productName}</h3>
              <p className="product-details">Details: {product.productDetails}</p>
              <div className="add-to-cart-section">
                <input type="number" defaultValue="1" min="1" className="quantity-input" />
                <button className="add-to-cart-button" onClick={() => addToCart(product._id, product.productName, product.productImageURL, product.price)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
