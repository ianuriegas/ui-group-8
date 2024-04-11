import React from 'react'
import './styles/WishlistCard.css'
function WishlistCard(props) {
  return (
    <div className='w-card-container'>
        
        <div className="w-left">
        <div className='item-name '>Item Name</div>
        <div className="item-price">Item Price</div>
        <button id='add-btn' type="submit">Add</button>
                </div>
        <div className="w-right"><img className='w-item-img' src={props.img} alt=""  /></div>
       
        
        
    
    </div>
  )
}

export default WishlistCard