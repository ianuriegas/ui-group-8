import React from 'react'
import './styles/FreqItemCard.css'


function FreqItemCard(props) {
  return (
    <div className='item-container'>
        <div className="left">
        <div className='item-name '>Item Name</div>
        <div className="item-price">Item Price</div>
        <button id='add-btn' type="submit">Add</button>
                </div>
        <div className="right"><img className='item-img' src={props.img} alt=""  /></div>
       
        
        
    </div>
  )
}

export default FreqItemCard