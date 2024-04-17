import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import "../styles/ProductDetails.css"


function ProductDetails() {
  const { productId } = useParams();
  const [products, setProducts] = useState([]);
  const [showNutritionFacts, setShowNutritionFacts] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isFilledHeart, setIsFilledHeart] = useState(false);

  // fetch products from db
  useEffect(() => {
      const fetchData = async () => {
      try {
          const response = await fetch('/getProducts');
          if (!response.ok) {
          throw new Error('Failed to fetch products');
          }
          const productsList = await response.json();
          setProducts(productsList);
      } catch (error) {
          console.error('Error fetching products:', error);
      }
      };
      fetchData();
  }, []);

  const filteredProduct = products.find((product) => product._id === productId);
  const renderAvailability = (available) => { return available ? "In stock" : "Out of stock"; };

  const handleIncrement = () => { setQuantity(quantity + 1); };
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // get user based off cookie
  function getCookie(name) {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ').reduce((acc, cookie) => {
      const [cookieName, cookieValue] = cookie.split('=');
      acc[cookieName] = cookieValue;
      return acc;
    }, {});
    return cookies[name];
  }
  const username = getCookie('username');
  // add to cart section
  const handleAddToCart = async () => {
    if (!username) {
      alert('Please sign in to add items to your cart.');
      return;
    }

    const cartItem = {
      username,
      productId: filteredProduct._id,
      quantity
    };

    try {
      const response = await fetch('/addToCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cartItem)
      });
      
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };
  // add to subscription section
  const handleAddToSub = async () => {
    if (!username) {
      alert('Please sign in to add items to your subscriptions.');
      return;
    }

    const subItem = {
      username,
      productId: filteredProduct._id,
    };

    try {
      const response = await fetch('/addToSubscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(subItem)
      });
      
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };
  // add to wishlist section
  const handleAddToWish = async () => {
    if (!username) {
      alert('Please sign in to add items to your wishlist.');
      return;
    }

    const wishItem = {
      username,
      productId: filteredProduct._id,
    };

    try {
      const response = await fetch('/addToWishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(wishItem)
      });
      
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };
  // add to favorites section
  const handleAddToFav = async () => {
    
    if (!username) {
      alert('Please sign in to add items to your favorites.');
      return;
    } else {
      setIsFilledHeart(!isFilledHeart);
    }

    const favItem = {
      username,
      productId: filteredProduct._id,
    };

    try {
      const endpoint = isFilledHeart ? '/removeFromFavorites' : '/addToFavorites';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(favItem)
      });
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <div className="details-container">
      {filteredProduct ? (
        <>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
          <div className="left-container">
            <div className="arrow-container">
              <Link to={`/category/${filteredProduct.category}`}><button className="fa fa-arrow-left" style={{color:'#275143' , backgroundColor:'white' , fontSize:'35px'}}></button></Link>
            </div>
            <div className="left-content">
              <div className='image-container'><img src={`/products/${filteredProduct.productImage}`} alt={filteredProduct.productImage} className="product-image" /></div>
              <div className='availability-container'><p>Availability: {renderAvailability(filteredProduct.available)}</p></div>
              <div className='description-title'><p>Description</p></div>
              <div className='description'><p>{filteredProduct.description}</p></div>
              <div className="dropdown">
                <button onClick={() => setShowNutritionFacts(!showNutritionFacts)}>Nutrition Facts</button>
                {showNutritionFacts && (
                  <div className="nutrition-facts">
                    <img src={`/nutrition/${filteredProduct.nutritionImage}`} alt={filteredProduct.nutritionImage} className='nutrition-image'/>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="right-container">
            <div className='right-content'>
              <div className='product-name-container'><h1 className='item-name-det'>{filteredProduct.productName}</h1></div>
              <div className="product-divider-container"><hr className="product-divider"/></div>
              <div className='shelf-life-container'>
                <div><p className='shelf-life'>Shelf life: {filteredProduct.shelfLife}</p></div>
                <button onClick={handleAddToFav} className={`favorites-button ${isFilledHeart ? 'fa fa-heart' : 'fa fa-heart-o'}`} style={{ color: '#E2743E' , fontSize:'30px'}}>
                  <i className="fa"></i>
                </button>
              </div>
              <div className='item-price-container'>
                <p className='item-price-det'>${filteredProduct.price}</p>
                <div className="quantity-container">
                  <button onClick={handleDecrement} className="quantity-button-det">
                    <i className="fa fa-minus" style={{color:'#808080' , backgroundColor:'white' , fontSize:'15px'}}></i>
                  </button>
                  <span className="quantity-det">{quantity}</span>
                  <button onClick={handleIncrement} className="quantity-button-det">
                    <i className="fa fa-plus" style={{color:'#808080' , backgroundColor:'white' , fontSize:'15px'}}></i>
                  </button>
                </div>
              </div>
              <button onClick={handleAddToCart} className="add-to-cart-button">Add to Cart</button>
              <button onClick={handleAddToSub} className="create-subscription-button">Create Subscription</button>
              <button onClick={handleAddToWish} className="add-to-wishlist-button">Add to Wishlist</button>
            </div>
            
          </div>
        </>
      ) : (
        <p>Loading...</p> // Handle case for buffer
      )}
    </div>
  );
}

export default ProductDetails;