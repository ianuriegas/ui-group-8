import React from 'react'
import '../styles/AccountPage.css'
import ItemCard1 from './ItemCard1'
import appleImg from '../images/apples.jpg'
import cerealImg from '../images/cereal.webp'
import pencil from '../images/pencil.png'
import check from '../images/check-mark.png'
import x from '../images/close.png'
import { useState } from 'react'

function AccountPage(props) {
    const [address, changeAddress] = useState(props.address);
    const [cardName, changeCardname] = useState(props.name);
    const [cardNumber, changeCardnumber] = useState(props.cardnumber);
    const [expiredate, changeExpiredate] = useState(props.expiredate);

    function showEdit(classname , classname2){
        const element = document.querySelector(classname);
        const element2 = document.querySelector(classname2);
        element.style.display = "none"
        if(classname2 === ".credential-container-t"){
            element2.style.display = "grid"
        }else{
            element2.style.display = "flex"
        }
        
        document.getElementById("addressInput").value = address;
        document.getElementById("card-name").value = cardName;
        document.getElementById("card-info").value = cardNumber;
        document.getElementById("exp-date").value = expiredate;
    }
    function hideEdit(classname , classname2){
        const element = document.querySelector(classname);
        const element2 = document.querySelector(classname2);
        
        if(classname === ".credential-container"){
            element.style.display = "grid"
        }else{
            element.style.display = "flex"
        }
        element2.style.display = "none"
        document.getElementById("addressInput").value = "";
        document.getElementById("card-name").value ="";
        document.getElementById("card-info").value ="";
        document.getElementById("exp-date").value ="";
    }
    function updateAddress(class1, class2){
        var addy = document.getElementById("addressInput").value;
        var cname = document.getElementById("card-name").value;
        var cinfo = document.getElementById("card-info").value;
        var edate =document.getElementById("exp-date").value;
        changeAddress(addy);
        changeCardname(cname)
        changeCardnumber(cinfo)
        changeExpiredate(edate)
        
        hideEdit(class1, class2);
        
        

    }

    
  return (
    <div className='account-page-container'>
        <h1 id='account-name'>{props.name}</h1>
        <div className="personal">
            <h1 className='sect-headers'>Personal Information</h1>
            <div className="info-container">
                <div className="address-label">
                    <h3>Address</h3>
                    <button  className='edit' onClick={() =>showEdit(".address", ".address-t")} type='image'><img src={pencil} alt="edit icon" /></button>
                    
                </div>
                <div className="address">{address}</div>
                <div className="address-t">
                    <input type="text" name="address" id="addressInput" />
                <button type="image" className='accept' onClick={()=>updateAddress(".address",".address-t")}><img src={check} alt="check mark" /></button>
                <button type="image" className='discard' onClick={()=>hideEdit(".address",".address-t")}><img src={x} alt="discard" /></button>
                </div>
                <div className="card-info-label">
                    <h3>Card Information</h3>
                    <button onClick={() =>showEdit(".credential-container", ".credential-container-t")} className='edit' type='image'><img src={pencil} alt="edit icon" /></button>
                </div>
                <div className="credential-container">
                    <div className="name-label">Name</div>
                    <div className="number-label">Card No.</div>
                    <div className="exp-date-label">Expire Date</div>
                    <div className="card-name">{cardName}</div>
                    <div className="card-info">{cardNumber}</div>
                    <div className="exp-date">{expiredate}</div>

                </div>
                <div className="credential-container-t">
                    <div className="name-label">Name</div>
                    <div className="number-label">Card No.</div>
                    <div className="exp-date-label">Expire Date</div>
                    <div className="card-name "><input className='tb' type="text" name="card-name" id="card-name" /></div>
                    <div className="card-info "><input className='tb' type="text" name="card-name" id="card-info" /></div>
                    <div className="exp-date "><input className='tb' type="text" name="card-name" id="exp-date" />
                    <button type="image" className='accept' onClick={()=>updateAddress(".credential-container",".credential-container-t")}><img src={check} alt="check mark" /></button>
                <button type="image" className='discard' onClick={()=>hideEdit(".credential-container",".credential-container-t")}><img src={x} alt="discard" /></button></div>


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
            <div className="sect-headers">Subscriptions</div>
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