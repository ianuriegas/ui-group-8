import React from 'react'
import '../styles/Navbar.css'
import logo from '../images/logo.png'
import person from '../images/person.png'
import cart from '../images/cart.png'
import LoginModal from './LoginModal'
import { Typography } from '@mui/material'

function Navbar() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className='nav-container'>

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <div className="nav-1">
            <a href="http://"><img id='logo' src={logo} alt="Logo Icon That Directs To Home Page" /></a>
            <div className="search-box">
            <form>
            <input  type="search" name="" id="search-bar" placeholder='Search...'/>
            <button><i className="fa fa-search search-icon" style={{color:'#275143' , backgroundColor:'white' , fontSize:'36px'}}></i></button>
            </form>

            </div>
            <div className='icon-group'>
            <a onClick={handleOpen}><img  className='icon' src={person} alt="Profile Icon That Allows User To Sign Up Or Log in" /></a>
            <LoginModal open={open} handleOpen={handleOpen} handleClose={handleClose} />
            <a href="http://"><img id='cart' className='icon' src={cart} alt="Cart Icon Which Shows Users selected items" /></a>
            </div>


            </div>
        <div className="nav-2">
            <div className='nav-item'>
                <a className='none' href="http://">Frozen</a>
            </div>
            <div className='nav-item'>
                <a className='none' href="http://">Dairy</a>
            </div>
            <div className='nav-item'>
                <a className='none' href="http://">Dry Foods</a>
            </div>
            <div className='nav-item'>
                <a className='none' href="http://">Bakery</a>
            </div>
            <div className='nav-item'>
                <a className='none' href="http://">Deli</a>
            </div>
            <div className='nav-item'>
                <a className='none' href="http://">Produce</a>
            </div>
            <div className='nav-item'>
                <a className='none' href="http://">Meat/Poultry</a>
            </div>
            <div className='nav-item'>
                <a className='none' href="http://">Kitchenware</a>
            </div>
            <div className='nav-item'>
                <a className='none' href="http://">Home Essentials</a>
            </div>
        </div>
    </div>
  )
}

export default Navbar