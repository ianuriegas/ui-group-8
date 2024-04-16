import React from 'react'
import '../styles/Navbar.css'
import logo from '../images/logo.png'
import person from '../images/person.png'
import cart from '../images/cart.png'
import LoginModal from './LoginModal'
import CreateAccountModal from './CreateAccountModal'
import ForgotPasswordModal from './ForgotPasswordModal'
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

export function getCookie(name) {
    const cookieString = document.cookie;

    // no cookies return null
    if (!cookieString) {
      return null;
    }
    
    // split cookie into arr
    let cookieArray = cookieString.split(';');
    for (let cookie of cookieArray) {
      let parts = cookie.split('=');
      if (parts.length === 2) {
        let key = parts[0].trim();
        let value = parts[1].trim();
        if (key === name) {
          return value;
        }
      }
    }
    // return null if cookie with 'name' not found
    return null;
}
  
function handleSignOut(username, setUsername) {
    document.cookie = `username=${username}; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    setUsername('');
    alert("Sucessfully logged out!");
    window.location.href = '/';
}

function Navbar() {
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [createAccountOpen, setCreateAccountOpen] = React.useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = React.useState(false);

  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);
  const handleCreateAccountOpen = () => setCreateAccountOpen(true);
  const handleCreateAccountClose = () => setCreateAccountOpen(false);
  const handleForgotPasswordOpen = () => setForgotPasswordOpen(true);
  const handleForgotPasswordClose = () => setForgotPasswordOpen(false);

  const [username, setUsername] = React.useState('');
  
  // get username from cookie   
  React.useEffect(() => {
    const user = getCookie('username');
    if (user) {
      setUsername(user);
    }
  }, []);

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
            {username ?
            <div class="dropdown">
                <button class="dropbtn"><MenuIcon style={{height: "40px", width: "40px"}} /></button>
                <div class="dropdown-content">
                    <a href="/account">Account Page</a>
                    <a onClick={() => handleSignOut(username, setUsername)}>Sign Out</a>
                </div>
            </div> : <div>
                <a onClick={handleLoginOpen}><img  className='icon' src={person} alt="Profile Icon That Allows User To Sign Up Or Log in" /></a>
                <LoginModal loginOpen={loginOpen} handleLoginClose={handleLoginClose} handleCreateAccountOpen={handleCreateAccountOpen} handleForgotPasswordOpen={handleForgotPasswordOpen}  />
                <CreateAccountModal createAccountOpen={createAccountOpen} handleCreateAccountClose={handleCreateAccountClose} handleLoginOpen={handleLoginOpen} />
                <ForgotPasswordModal forgotPasswordOpen={forgotPasswordOpen} handleForgotPasswordClose={handleForgotPasswordClose} handleLoginOpen={handleLoginOpen} />
            </div> }
            <Link to="/cart"><img id='cart' className='icon' src={cart} alt="Cart Icon Which Shows Users selected items" /></Link>
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