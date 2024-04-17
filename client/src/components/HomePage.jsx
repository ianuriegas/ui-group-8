import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css'
import PromoCard from './PromoCard'
import appleImg from '../images/apples.jpg'

function HomePage() {
    const [discounts, setDiscounts] = useState([]);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const username = getCookie('username');

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
    
     // fetch discounts from db
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/getDiscounts');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const discountList = await response.json();
                setDiscounts(discountList);

                if (username) {
                    const wishlistResponse = await fetch(`/wishlist/${username}`);
                    if (!wishlistResponse.ok) {
                      throw new Error('Failed to fetch wishlist items');
                    }
                    const wishlistData = await wishlistResponse.json();
                    setWishlistItems(wishlistData.productIds || []); // Handle empty wishlist
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchData();
    }, [username]);

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

    // Filter products based on wishlist items
    useEffect(() => {
        if (wishlistItems.length > 0 && products.length > 0) {
            const filtered = products.filter(product => wishlistItems.includes(product._id));
            setFilteredProducts(filtered);
        }
    }, [wishlistItems, products]);

    return (
        <div className="homepage-container">
        <div className="promo row">
            <h2 className='section'>Promotions</h2>
            <div className="promo-cards-row">
                {discounts.map((discount, index) => (
                    <PromoCard
                        key={index}
                        description={discount.description}
                        code={`Code: ${discount.discountCode}`}
                    />
                ))}
            </div>
        </div>
        <div className="freq row">
            <h2 className='section'>Frequently Shopped Categories</h2>
            <div className="freq-cards-row">
                <Link to="/category/frozen" className='freqB'>Frozen</Link>
                <Link to="/category/dairy" className='freqB'>Dairy</Link>
                <Link to="/category/dry-foods" className='freqB'>Dry Foods</Link>
                <Link to="/category/home-essentials" className='freqB'>Home Essentials</Link>
            </div>
        </div>
        <div className="wish row">
            <h2 className='section'>Wish List</h2>
            <div className="wish-img-row">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <div key={product._id}>
                            <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
                                <img
                                    className="wish-img"
                                    src={`/products/${product.productImage}`}
                                    alt={product.productName}
                                />
                                <p className="wish-name">{product.productName}</p>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="sign-in-wish">Sign in to view wishlist.</p>
                )}
            </div>
        </div>
        </div>
    )
}

export default HomePage