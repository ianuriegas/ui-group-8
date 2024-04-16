import { useState, useEffect } from 'react'
import '../../styles/Cart.css'

const CartItem = ({ imgSrc, itemName, price, quant, onQuantityChange }) => {
    const [quantity, setQuantity] = useState(quant);
    const [imageSrc, setImageSrc] = useState(imgSrc);
    // If there is no imgSrc provided, it will go ahead and try to find one from online.
    useEffect(() => {
        const fetchFirstImageURL = async () => {
            const apiKey = '8Jy7i43LXWJdnUW2pOqdrVFrhEqYquyu3h7B1ZxzwBZZDrMjkiatJMgN';
            const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(itemName)}&orientation=square`;
            
            try {
                const response = await fetch(url, {
                    headers: {
                      Authorization: apiKey
                    }
                  });
              const data = await response.json();
                
              if (data.photos && data.photos.length > 0) {
                setImageSrc(data.photos[0].src.original);
                console.log(data.photos[0].src.original);
              }
            } catch (error) {
              console.error("Error fetching image:", error);
            }
        };
        
        if (!imgSrc) {
            fetchFirstImageURL();
        }
    }, [itemName, imgSrc]);
    const handleSubtract = () => {
        const newQuantity = quantity > 1 ? quantity - 1 : 1; // Prevent quantity from going below 1
        setQuantity(newQuantity);
        onQuantityChange(newQuantity);
    };

    const handleAdd = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        onQuantityChange(newQuantity);
    };

    // Removed fetchFirstImageURL call here

    // Component's return JSX
    return (
        <div className="cart-item flex items-center justify-between space-x-4">
            <img src={imageSrc} alt="Food item" className='w-20 h-20 object-cover'/>
            <div className="text-lg flex-1">
                <p className="name">{itemName}</p>
                <p className="price">${price}</p>
            </div>
            <div className="quantity-selector flex items-center">
                <button id='subtract' onClick={handleSubtract}>-</button>
                <p>{quantity}</p>
                <button id='add' onClick={handleAdd}>+</button>
            </div>
        </div>
    );
}

export default CartItem;