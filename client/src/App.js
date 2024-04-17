import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import Cart from './components/Cart';
import AccountPage from "./components/AccountPage";
import { getCookie } from "./components/Navbar";
import Category from "./components/Category";
import ProductDetails from "./components/ProductDetails";
import './App.css'

function App() {
  const [username, setUsername] = React.useState('');
  
  // get username from cookie   
  React.useEffect(() => {
    const user = getCookie('username');
    if (user) {
      setUsername(user);
    }
  }, []);

  return (
      <Router>
        <Navbar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<HomePage/>} />
            <Route path="/category/:categoryName" element={<Category />} /> 
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart/>} />
            {username ?
            <Route path="/account" element={<AccountPage name="Keenan Ray" address="323 Burgamy Way, Lands Between" cardnumber="4000-xxxx-xxxx-xxxx" expiredate="4/28"/>} />
            : <></>}
          </Routes>
        </div>
        <Footer />
      </Router>
  );
}

export default App;
