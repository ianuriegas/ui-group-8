import React from "react"
import '../styles/Cart.css'

function CartItem(props){
    return(
        <><div className="cart-item">
            <img src={props.imgSrc} alt="Food item" />
            <div className="name-price">
                <p className="name">{props.itemName}</p>
                <p className="price">${props.price}</p>
            </div>
            <div className="quantity-selector">
                <button id='subtract'>-</button>
                <p>1</p><p />
                <button id='add'>+</button>
            </div>

        </div>
        <hr></hr></>
    )
}

export default CartItem