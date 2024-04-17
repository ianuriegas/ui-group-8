import React from 'react'
import '../styles/HomePage.css'
import PromoCard from './PromoCard'
import appleImg from '../images/apples.jpg'
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="homepage-container">
    <div className="promo row">
        <h2 className='section'>Promotions</h2>
        <div className="promo-cards-row">
            <PromoCard description="20% off Produce " code="The Code: FHDFYJ"/>
            <PromoCard description="10% of Bakery " code="The Code: FHDFYJ"/>
            <PromoCard description="5$ off Deli " code="The Code: FHDFYJ"/>
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