import React from "react"
import CartItem from "./CartItem"
import appleImg from '../images/apples.jpg'
import '../styles/Cart.css'

function Cart(){
    return(
        <><div className="cart-container">
            <div className="review-cart">
                <h2>Review Cart</h2>
                <CartItem itemName='Mini Cupcake' imgSrc={appleImg} price='9.99' />
                <CartItem itemName='Mini Cupcake' imgSrc={appleImg} price='9.99' />

            </div>
            <div className="order-summary">
                <h2>Order Summary</h2>
                <div className="delivery-pickup-toggle">
                    <p className="delivery-pickup-toggle-selected">Delivery</p>
                    <p>Pickup</p>
                </div>
                <div className="address-selector">
                    {/* Address selector implementation */}
                </div>
                <div className="payment-selector">
                    {/* Payment selector implementation */}
                </div>
                <div className="discount-code">
                    {/* Discount code implementation */}
                </div>
                <div className="total">
                    <p>Total: </p>
                    <p>$9.46</p>
                </div>
                <button className="checkout-button">Checkout</button>
            </div>
        </div>
        </>
    
    )
}

export default Cart