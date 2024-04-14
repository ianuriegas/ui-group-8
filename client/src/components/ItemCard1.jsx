import React from 'react'
import '../styles/ItemCard1.css'

function ItemCard1(props) {
  return (
    <div className='item-card1-container'>
        <a href=""><img className='item-img' src={props.img} alt=""  /></a>
        <div className="item-name">{props.name}</div>
    </div>
  )
}

export default ItemCard1