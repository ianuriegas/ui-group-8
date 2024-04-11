import React from 'react'
import './styles/Wishlist.css'
import WishlistCard from './WishlistCard'
import img4 from './images/oranges.jpg'

function Wishlist() {
  return (
    <div className="wishlist-row">
        <div className="wishlist-label"><h2>Wishlist</h2></div>
        
        <div className="wishlist-container">
            <WishlistCard img={img4}/>
            <WishlistCard img={img4}/>
            <WishlistCard img={img4}/>
            <WishlistCard img={img4}/>
            <WishlistCard img={img4}/>
        </div>
    </div>
  )
}

export default Wishlist