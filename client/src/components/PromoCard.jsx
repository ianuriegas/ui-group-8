import React from 'react'
import '../styles/PromoCard.css'

function PromoCard(props) {
  return (
    <div className='promo-container'>
        <div className="promo-description">{props.description}</div>
        <div className="promo-code">{props.code}</div>
        </div>
  )
}

export default PromoCard