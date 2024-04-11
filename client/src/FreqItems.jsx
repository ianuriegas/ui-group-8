import React from 'react'
import './styles/FreqItems.css'
import FreqItemCard from './FreqItemCard'
import img1 from './images/apples.jpg'
import img2 from './images/grapeJelly.jpg'
import img3 from './images/mop.jpg'
import img4 from './images/oranges.jpg'


function FreqItems() {
  return (
    <div className='freq-items-row'>
        <h2 className='freq-label'>Frequently Bought</h2>
        <div className="freq-items-container">
            <FreqItemCard img={img1}/>
            <FreqItemCard img={img2} />
            <FreqItemCard  img={img3}/>
            <FreqItemCard  img={img4}/>


        </div>
    </div>
  )
}

export default FreqItems