import React, { useEffect } from 'react'
import '../styles/AccountPage.css'
import ItemCard1 from './ItemCard1'
import appleImg from '../images/apples.jpg'
import cerealImg from '../images/cereal.webp'
import pencil from '../images/pencil.png'
import check from '../images/check-mark.png'
import x from '../images/close.png'
import { useState } from 'react'
import { getCookie } from './Navbar'

function AccountPage({username}) {
    const[isOpen,changeToggle] =  useState(false)
    const [street, changeStreet] = useState();
    const [city, changeCity] = useState();
    const [state, changeState] = useState();
    const [country, changeCountry] = useState();
    const [pcode, changePcode]= useState()
    const [address, changeAddress] = useState('');
    const [cardName, changeCardname] = useState('');
    const [cardType, changeCardtype] = useState();
    const [cardNumber, changeCardnumber] = useState();
    const [expiredate, changeExpiredate] = useState();
    const [cvv, changeCvv] = useState();
    const [user, setUser] = useState({});

    useEffect(() => {
        fetch(`/getUserFromUsername?username=${encodeURIComponent(username)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => setUser(data))
        .catch(error => console.error('Error:', error));
    }, [username]);
    
    function showEdit(classname , classname2){
        const element = document.querySelector(classname);
        const element2 = document.querySelector(classname2);
        if(isOpen === false){ 
        element.style.display = "none"
        element2.style.display ="grid"
        }else{
            element2.style.display = "none"
            element.style.display ="grid"  
        }
        
        changeToggle(!isOpen);
        if(classname ===".non-edit-a"){
            document.getElementById("streetInput").value = street;
            document.getElementById("cityInput").value = city;
            document.getElementById("stateInput").value = state;
            document.getElementById("postalInput").value = pcode;
            document.getElementById("countryInput").value = country;
        }if(classname ===".non-edit-b"){
            document.getElementById("cardTypeInput").value = cardType;
            document.getElementById("cardNumInput").value = cardNumber;
            document.getElementById("expireDateInput").value = expiredate;
            document.getElementById("cvvInput").value = cvv;
            
        }
        
        // document.getElementById("addressInput").value = address;
        // document.getElementById("card-name").value = cardName;
        // document.getElementById("card-info").value = cardNumber;
        // document.getElementById("exp-date").value = expiredate;
    }
    function hideEdit(classname , classname2){
        const element = document.querySelector(classname);
        const element2 = document.querySelector(classname2);
        
        element.style.display = "grid"
        element2.style.display = "none"
        // document.getElementById("addressInput").value = "";
        // document.getElementById("card-name").value ="";
        // document.getElementById("card-info").value ="";
        // document.getElementById("exp-date").value ="";
    }
    function updateInfo(class1, class2){
        if(class1===".non-edit-a"){
            var streetInput = document.getElementById("streetInput").value;
        var cityInput = document.getElementById("cityInput").value;
        var stateInput = document.getElementById("stateInput").value;
        var countryInput =document.getElementById("countryInput").value;
         var postalInput =document.getElementById("postalInput").value;


       document.getElementById("streetInput").value ="";
        document.getElementById("cityInput").value="";
        document.getElementById("stateInput").value="";
        document.getElementById("countryInput").value="";
        document.getElementById("postalInput").value="";


        changeCity(cityInput)
        changeCountry(countryInput)
        changePcode(postalInput)
        changeStreet(streetInput)
        changeState(stateInput)

        const newAddress ={
            "street": street, 
            "city":city,
            "state": state,
            "postalCode" :pcode ,
            "country": country

        }
        // updateAddress(newAddress );


        }
        if(class1 ===".non-edit-b"){
            var ctypeInput = document.getElementById("cardTypeInput").value;
            var cnumInput = document.getElementById("cardNumInput").value;
            var expInput = document.getElementById("expireDateInput").value;
            var cvvInput = document.getElementById("cvvInput").value;

        document.getElementById("cardTypeInput").value="";
        document.getElementById("cardNumInput").value="";
        document.getElementById("expireDateInput").value="";
        document.getElementById("cvvInput").value="";

        changeCardtype(ctypeInput);
        changeCardnumber(cnumInput);
        changeExpiredate(expInput);
        changeCvv(cvvInput);
        }
        
        
        
        hideEdit(class1, class2);
        
        

    }
    const updateAddress= (newAddress) => {
        fetch(`/updateAddress/${username}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newAddress)
        })
        .then(response => response.json())
        .then(data => {
            console.log("data sent", data);
            
        })
        .catch(error => {
            console.error("Error sending", error);
            
        });
      }

    
  return (
    <div className='account-page-container'>
        <h1 id='account-name'>{user.firstName} {user.lastName}</h1>
        <div className="personal">
            <div className="personal-info-label">Personal Information</div>
            <div className="address-container">
                <div className="address-label-c">
                    <div className="address-label">Address</div>
                    <button onClick={()=>showEdit(".non-edit-a",".editable-a")} className='edit'><img  src={pencil} alt="" /></button>
                </div>
                <div className="non-edit-a">
                <div className="label col1 row1">Street</div>
                <div className="label col1 row2">City</div>
                <div className="label col1 row3">State</div>
                <div className="label col1 row4">Postal Code</div>
                <div className="label col1 row5">Country</div>

                <div className="values col2 row1">{street}</div>
                <div className="values col2 row2">{city}</div>
                <div className="values col2 row3">{state}</div>
                <div className="values col2 row4">{pcode}</div>
                <div className="values col2 row5">{country}</div>
                </div>

                <div className="editable-a">
                <div className="label col1 row1">Street</div>
                <div className="label col1 row2">City</div>
                <div className="label col1 row3">State</div>
                <div className="label col1 row4">Postal Code</div>
                <div className="label col1 row5">Country</div>

                <input className='addressInput col2 row1' type="text" name="streetinput" id="streetInput" />
                <input className='addressInput col2 row2' type="text" name="cityinput" id="cityInput" />
                <input className='addressInput col2 row3' type="text" name="stateinput" id="stateInput" />
                <input className='addressInput col2 row4' type="text" name="postalinput" id="postalInput" />
                <input className='addressInput col2 row5 ' type="text" name="countryinput" id="countryInput" />
                <div className="icons-container row5">
                <button onClick={()=> updateInfo(".non-edit-a",".editable-a")} type="submit"><img  src={check} alt="check mark" /></button>
                <button onClick={()=> hideEdit(".non-edit-a",".editable-a")} type="submit"><img  src={x}alt="cancel" /></button></div>
                
                
                
                

                </div>
               
                
            </div>
            <div className="card-info-container">
            <div className="address-label-c">
                    <div className="address-label">Card Information</div>
                    <button onClick={()=>showEdit(".non-edit-b",".editable-b")} className='edit'><img  src={pencil} alt="edit" /></button>
                </div>
                <div className="non-edit-b">
                <div className="label col1 row1">Card Type</div>
                <div className="label col1 row2">Card Number</div>
                <div className="label col1 row3">Expire Date</div>
                <div className="label col1 row4">CVV</div>

                <div className="values col2 row1">{cardType}</div>
                <div className="values col2 row2">{cardNumber}</div>
                <div className="values col2 row3">{expiredate}</div>
                <div className="values col2 row4">{cvv}</div>
                </div>

                <div className="editable-b">
                <div className="label col1 row1">Card Type</div>
                <div className="label col1 row2">Card Number</div>
                <div className="label col1 row3">Expire Date</div>
                <div className="label col1 row4">CVV</div>

                <input className="addressInput col2 row1" type="text" name="cardtypeinput" id="cardTypeInput" />
                <input className="addressInput col2 row2" type="text" name="cardnuminput" id="cardNumInput" />
                <input className="addressInput col2 row3" type="text" name="expdateinput" id="expireDateInput" />
                <input className="addressInput col2 row4" type="text" name="cvvinput" id="cvvInput" />
                <div className="icons-container row4">
                <button onClick={()=> updateInfo(".non-edit-b",".editable-b")} type="submit"><img  src={check} alt="check mark" /></button>
                <button onClick={()=> hideEdit(".non-edit-b",".editable-b")} type="submit"><img  src={x}alt="cancel" /></button></div>
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