import React from 'react'
import '../styles/AccountPage.css'
import ItemCard1 from './ItemCard1'
import appleImg from '../images/apples.jpg'
import cerealImg from '../images/cereal.webp'

function AccountPage(props) {
  return (
    <div className='account-page-container'>
        <h1 id='account-name'>{props.name}</h1>
        <div className="personal">
            <h1 className='sect-headers'>Personal Information</h1>
            <div className="info-container">
                <div className="address-label">Address</div>
                <div className="address">{props.address}</div>
                <div className="card-info-label">Card Information</div>
                <div className="credential-container">
                    <div className="name-label">Name</div>
                    <div className="number-label">Card No.</div>
                    <div className="exp-date-label">Expire Date</div>
                    <div className="card-name">{props.name}</div>
                    <div className="card-info">{props.cardnumber}</div>
                    <div className="exp-date">{props.expiredate}</div>

                </div>
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