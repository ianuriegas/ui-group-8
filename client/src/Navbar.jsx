import React from "react";
import './styles/Navbar.css';


function Navbar() {
  return (
    <div>
        <div className="nav-container">
            <form className="search-form" action="">
                
                <input type="search" name="searchbar" id="search-bar" placeholder="Search" />
                <button type="submit" className="search-button">Search</button>
            </form>
            <div className="nav-items">
                <div className="right-items">
                <a href="" id="login-label">Login</a>
                <a href="" id="cart-label">Cart</a>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Navbar