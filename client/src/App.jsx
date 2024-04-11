import React, { useEffect, useState } from "react";
import Navbar from "./componenets/Navbar";
import Navbar2 from "./componenets/Navbar2";
import Promotion from "./componenets/Promotion";
import FreqItems from "./componenets/FreqItems";
import Wishlist from "./componenets/Wishlist";
import Footer from "./componenets/Footer";

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
