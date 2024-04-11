import React from 'react'
import './styles/Promotions.css'
import PromotionCard from './PromotionCard'

function Promotion() {
  return (
    
    <div >
        <h2 id='promo-label'>Promotions</h2>
        <div className='promotions-container'>
        
    <PromotionCard />
    <PromotionCard />
    <PromotionCard />
    <PromotionCard />
    <PromotionCard />

</div></div>
  )
}

export default Promotion