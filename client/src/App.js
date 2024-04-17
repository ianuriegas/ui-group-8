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
  const [name, setName] = React.useState('');
  
  // get username from cookie   
  React.useEffect(() => {
    const user = getCookie('username');
    if (user) {
      setUsername(user);
    }
  }, []);
  React.useEffect(() => {
    const namee = getCookie('name');
    if (namee) {
      setName(namee);
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
            {/* <Route path="/" element={<AccountPage name={ }
            street="Fill In"
            city="Fill In"
            state="Fill In"
            country="Fill In"
            pcode="Fill In"
            cardType="Fill In"
            cNumber="1234--xxxx-xxxx-xxxx"
            expDate="Fill In"
            cvv="Fill In"
            
            
            cardnumber="4000-xxxx-xxxx-xxxx" expiredate="4/28"/>} /> */}
            {username ?
            <Route path="/account" element={<AccountPage name={name} street="Fill In"
            city="Fill In"
            state="Fill In"
            country="Fill In"
            pcode="Fill In"
            cardType="Fill In"
            cNumber="1234--xxxx-xxxx-xxxx"
            expDate="Fill In"
            cvv="Fill In"
            />} />
            : <></>}
          </Routes>
        </div>
        <Footer />
      </Router>
  );
}

export default App;
