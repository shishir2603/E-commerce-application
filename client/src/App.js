import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Signup from './Signup/signup';
import LoginForm from './Login/login';
import HomePage from './Login/homePage';
import AddProductForm from './AddProducts/addProducts';
import ProductList from './DisplayProducts.js/ProductList';
import CartPage from './Cart/Cart';
import UpdateProfilePage from './Login/updateProfile';
import Navbar from './Navbar/Navbar';
import CheckoutPage from './Checkout/CheckoutPage';
import OrdersPage from './Orders/OrdersPage';
function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <Router>
            <div className="App">
                <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
                <Switch>
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/login">
                        <LoginForm setIsAuthenticated={setIsAuthenticated} />
                    </Route>
                    <PrivateRoute exact path="/" isAuthenticated={isAuthenticated} component={HomePage} />
                    <PrivateRoute exact path="/products" isAuthenticated={isAuthenticated} component={ProductList} />
                    <PrivateRoute exact path="/about" isAuthenticated={isAuthenticated} component={UpdateProfilePage} />
                    <PrivateRoute exact path="/contact" isAuthenticated={isAuthenticated} component={CartPage} />
                    <PrivateRoute exact path='/addProduct' isAuthenticated={isAuthenticated} component={AddProductForm} />
                    <PrivateRoute exact path='/displayProducts' isAuthenticated={isAuthenticated} component={ProductList} />
                    <PrivateRoute exact path='/cart' isAuthenticated={isAuthenticated} component={CartPage} />
                    <PrivateRoute exact path='/update-profile' isAuthenticated={isAuthenticated} component={UpdateProfilePage} />
                    <PrivateRoute exact path='/checkout' isAuthenticated={isAuthenticated} component={CheckoutPage}/>
                    <PrivateRoute exact path='/past-orders' isAuthenticated={isAuthenticated} component={OrdersPage}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
