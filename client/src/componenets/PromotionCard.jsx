import React from 'react'
import '../styles/PromotionCard.css'
import dummyImg from '../images/produce.jpg'



function PromotionCard() {
  return (
    <div className="card-container">
        <img className='promo-img' src={dummyImg} alt="" />
        <div className="centered">Promotion</div>
    </div>
  )
}

export default PromotionCard
