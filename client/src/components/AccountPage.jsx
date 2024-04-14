import React from 'react'
import '../styles/AccountPage.css'
import ItemCard1 from './ItemCard1'
import appleImg from '../images/apples.jpg'
import cerealImg from '../images/cereal.webp'

function AccountPage() {
  return (
    <div className='account-page-container'>
        <h1 id='account-name'>Account Name</h1>
        <div className="personal">
            <h1 className='sect-headers'>Personal Information</h1>
            <div className="info-container">
                <div className="address">Address</div>
                <div className="card-info">Card Information</div>
            </div>
        </div>
        <div className="wishlist">
            <div className="header-row">
            <div className="sect-headers">Wishlist</div>
            <form className='check-container'>
                <div >
                    <label>
                        <input type="checkbox" className='checkbox'/> Hide Unavailable
                    </label>
                </div>
            </form>
            </div>
            <div className="sub-items-container">
                <ItemCard1 img={appleImg} name="Apples"/>
                <ItemCard1 img={appleImg} name="Apples"/>
                <ItemCard1 img={appleImg} name="Apples"/>
                <ItemCard1 img={cerealImg} name="Cereal"/>


            </div>
        </div>
        <div className="favorites">
        <div className="header-row">
            <div className="sect-headers">Favorites</div>
            <form className='check-container'>
                <div >
                    <label>
                        <input type="checkbox" className='checkbox'/> Hide Unavailable
                    </label>
                </div>
            </form>
            </div>
            <div className="sub-items-container">
                <ItemCard1 img={appleImg} name="Apples"/>
                <ItemCard1 img={appleImg} name="Apples"/>
                <ItemCard1 img={appleImg} name="Apples"/>
                <ItemCard1 img={cerealImg} name="Cereal"/>


            </div>

        </div>
        
        <div className="subscriptions">
        <div className="header-row">
            <div className="sect-headers">Wishlist</div>
            <form className='check-container'>
                <div >
                    <label>
                        <input type="checkbox" className='checkbox'/> Hide Unavailable
                    </label>
                </div>
            </form>
            </div>
            <div className="sub-items-container">
                <ItemCard1 img={appleImg} name="Apples "/>
                <ItemCard1 img={appleImg} name="Apples"/>
                <ItemCard1 img={appleImg} name="Apples"/>
                <ItemCard1 img={cerealImg} name="Cereal"/>


            </div> 
        </div>
    </div>
  )
}

export default AccountPage