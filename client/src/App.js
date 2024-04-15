import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import Category from "./components/Category";

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
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:categoryName" element={<Category />} /> 
          </Routes>
        </div>
      
        <Footer />

        {/* {typeof backendData.users === "undefined" ? (
          <p>Loading...</p>
        ) : (
          backendData.users.map((user, i) => <p key={i}> {user}</p>)
        )} */}
      </div>
    </BrowserRouter>
  );
}

export default App;
