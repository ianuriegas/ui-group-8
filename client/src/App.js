import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import Cart from './components/Cart';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AccountPage from "./components/AccountPage";

function App() {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  return (
      <Router>
        <Navbar />
        
        <div className="content">
          <Routes>
            <Route exact path="/" element={<HomePage/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/account" element={<AccountPage name="Keenan Ray" address="323 Burgamy Way, Lands Between" cardnumber="4000-xxxx-xxxx-xxxx" expiredate="4/28"/>} />
            {/* Add other routes here */}
          </Routes>
        </div>
        <Footer />

        {/* {typeof backendData.users === "undefined" ? (
          <p>Loading...</p>
        ) : (
          backendData.users.map((user, i) => <p key={i}> {user}</p>)
        )} */}
      </Router>
  );
}

export default App;
