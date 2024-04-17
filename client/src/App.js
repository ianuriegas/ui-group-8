import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import Cart from './components/Cart';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AccountPage from "./components/AccountPage";
import { getCookie } from "./components/Navbar";

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
            <Route path="/cart" element={<Cart/>} />
            {/* <Route path="/" element={<AccountPage name="Keenan Ray" 
            street="123 Burgamy Way"
            city="Lands"
            state="Between"
            country="Nokron"
            pcode="42795"
            cardType="Visa"
            cNumber="4000--xxxx-xxxx-xxxx"
            expDate="4/26"
            cvv="123"
            
            
            cardnumber="4000-xxxx-xxxx-xxxx" expiredate="4/28"/>} /> */}
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
