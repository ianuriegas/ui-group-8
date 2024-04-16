import { useState } from 'react'
import CartItem from "./CartItem"
import appleImg from '../../images/apples.jpg'
import '../../styles/Cart.css'
import OrderSummary from "./OrderSummary"

const Cart = () => {
   const [items, setItems] = useState([
      { itemName: 'Mini Cupcake', price: 10.10, quant: 1 },
      { itemName: 'Chocolate Chip Cookie', price: 2.50, quant: 3 },
      { itemName: 'French Baguette', price: 5.00, quant: 2 },
      { itemName: 'Blueberry Muffin', price: 3.75, quant: 2 },
      { itemName: 'Cheese Danish', price: 4.25, quant: 1 },
      { itemName: 'Apple Pie Slice', price: 3.50, quant: 1 },
      { itemName: 'Cinnamon Roll', price: 3.99, quant: 4 },
      { itemName: 'Glazed Donut', price: 1.99, quant: 5 },
      { itemName: 'Bagel with Cream Cheese', price: 4.50, quant: 2 },
      { itemName: 'Vegan Brownie', price: 4.00, quant: 1 }
    ]);
    const handleQuantityChange = (index, newQuantity) => {
      const updatedItems = items.map((item, i) => {
        if (i === index) {
          return { ...item, quant: newQuantity };
        }
        return item;
      });
      setItems(updatedItems);
    };
    return(
        <><div className="cart-container">
            <div className="review-cart">
                <h2>Review Cart</h2>
                <div>
               {items.map((item, index) => (
               <CartItem 
                  key={index}
                  itemName={item.itemName}
                  imgSrc={null}
                  price={item.price.toFixed(2)}
                  quant={item.quant}
                  onQuantityChange={(newQuantity) => handleQuantityChange(index, newQuantity)}
               />
               ))}
            </div>

            </div>
            <OrderSummary items={items}/>
        </div>
        </>
    
    )
}

export default Cart