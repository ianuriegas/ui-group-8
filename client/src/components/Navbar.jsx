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
import SearchBar from './SearchBar'

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
            <Link to="/"><img id='logo' src={logo} alt="Logo Icon That Directs To Home Page" /></Link>
            {/* <div className="search-box"> */}
            <SearchBar />

            {/* </div> */}
            <div className='icon-group'>
            {username ?
            <div class="dropdown">
                <MenuIcon className="dropbtn" style={{height: "40px", width: "40px"}} />
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
                <Link to="/category/frozen" className='none'>Frozen</Link>
            </div>
            <div className='nav-item'>
                <Link to="/category/dairy" className='none'>Dairy</Link>
            </div>
            <div className='nav-item'>
                <Link to="/category/dry-foods" className='none'>Dry Foods</Link>
            </div>
            <div className='nav-item'>
                <Link to="/category/bakery" className='none'>Bakery</Link>
            </div>
            <div className='nav-item'>
                <Link to="/category/deli" className='none'>Deli</Link>
            </div>
            <div className='nav-item'>
                <Link to="/category/produce" className='none'>Produce</Link>
            </div>
            <div className='nav-item'>
                <Link to="/category/meat-poultry" className='none'>Meat/Poultry</Link>
            </div>
            <div className='nav-item'>
                <Link to="/category/kitchenware" className='none'>Kitchenware</Link>
            </div>
            <div className='nav-item'>
                <Link to="/category/home-essentials" className='none'>Home Essentials</Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar