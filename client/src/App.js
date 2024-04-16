import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
// import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import Cart from './components/Cart';

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
    <div className="app">
      <Navbar />
      <div className="content">
        <Cart />

      </div>
      <Footer />

      {/* {typeof backendData.users === "undefined" ? (
        <p>Loading...</p>
      ) : (
        backendData.users.map((user, i) => <p key={i}> {user}</p>)
      )} */}
    </div>
  );
}

export default App;
