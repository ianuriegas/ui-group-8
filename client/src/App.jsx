import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Navbar2 from "./Navbar2";
import Promotion from "./Promotion";
import FreqItems from "./FreqItems";
import Wishlist from "./Wishlist";
import Footer from "./Footer";

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
    <div>
      <Navbar/>
      <Navbar2 />
      <Promotion />
      <FreqItems />
      <Wishlist />
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
