import { useState, useEffect } from 'react'
import '../../styles/Cart.css'

const CartItem = ({ imgSrc, itemName, price, quant, onQuantityChange }) => {
    const [quantity, setQuantity] = useState(quant);
    const [imageSrc, setImageSrc] = useState(imgSrc);
    useEffect(() => {
        const fetchImage = async () => {
            if (imgSrc) return;

            try {
                const response = await fetch(`/imgSearch?itemName=${encodeURIComponent(itemName)}`);
                const data = await response.json();

                if (response.ok) {
                    setImageSrc(data.imageUrl);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error("Error fetching image from the server:", error);
            }
        };
        if (!imgSrc) {
            fetchImage();
        }
    }, [itemName, imgSrc]);
    const handleSubtract = () => {
        const newQuantity = quantity > 0 ? quantity - 1 : 1;
        setQuantity(newQuantity);
        onQuantityChange(newQuantity);
    };

    const handleAdd = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        onQuantityChange(newQuantity);
    };

    return (
        <div className="cart-item flex items-center justify-between space-x-4">
            <img src={imageSrc} alt="Food item" className='w-10 h-10 object-cover'/>
            <div className="text-lg flex-1 pl-[50px]">
                <p className="name text-3xl mb-4">{itemName}</p>
                <p className="price text-3xl font-extrabold">${price}</p>
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