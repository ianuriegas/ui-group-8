import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css'
import PromoCard from './PromoCard'
import appleImg from '../images/apples.jpg'

function HomePage() {
    const [discounts, setDiscounts] = useState([]);
     // fetch discounts from db
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch('/getDiscounts');
            if (!response.ok) {
            throw new Error('Failed to fetch products');
            }
            const discountList = await response.json();
            setDiscounts(discountList);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
        };
        fetchData();
    }, []);

    return (
        <div className="homepage-container">
        <div className="promo row">
            <h2 className='section'>Promotions</h2>
            <div className="promo-cards-row">
                {discounts.map((discount, index) => (
                    <PromoCard
                        key={index}
                        description={discount.description}
                        code={`The Code: ${discount.discountCode}`}
                    />
                ))}
            </div>
        </div>
        <div className="freq row">
            <h2 className='section'>Frequently Shopped Categories</h2>
            <div className="freq-cards-row">
                <Link to="/category/frozen" className='freqB'>Frozen</Link>
                <Link to="/category/dairy" className='freqB'>Dairy</Link>
                <Link to="/category/dry-foods" className='freqB'>Dry Foods</Link>
                <Link to="/category/home-essentials" className='freqB'>Home Essentials</Link>
            </div>
        </div>
        <div className="wish row">
            <h2 className='section'>Wish List</h2>
            <div className="wish-img-row">
                <a href="/"><img className='wish-img' src={appleImg} alt="random " /></a>
                <a href="/"><img className='wish-img' src={appleImg} alt="random " /></a>
                <a href="/"><img className='wish-img' src={appleImg} alt="random " /></a>
                <a href="/"><img className='wish-img' src={appleImg} alt="random" /></a>
                <a href="/"><img className='wish-img' src={appleImg} alt="random " /></a>
                

            </div>
        </div>
        </div>
    )
}

export default HomePage