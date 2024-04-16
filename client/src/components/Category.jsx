import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import "../styles/Category.css"

// mapping for category display names
const categoryDisplayName = {
    'frozen': 'Frozen',
    'dairy': 'Dairy',
    'dry-foods': 'Dry Foods',
    'bakery': 'Bakery',
    'deli': 'Deli',
    'produce': "Produce",
    'meat-poultry': "Meat/Poultry",
    'kitchenware': "Kitchenware",
    'home-essentials': "Home Essentials"
}

function Category() {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
    const [priceRange, setPriceRange] = useState('');
    const [hideUnavailable, setHideUnavailable] = useState(false);

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

    // function to get the display name for the category
    const getDisplayName = (categoryName) => { return categoryDisplayName[categoryName] || categoryName; };

    // function to format price
    const formatPrice = (price) => { return `${price.toFixed(2)}`; };

    // event handler for price range checkbox change
    const handlePriceRangeChange = (event) => { 
        const newValue = event.target.value;
        setPriceRange((prevValue) => (prevValue === newValue ? '' : newValue));
    };

    // event handler for availability checkbox change
    const handleAvailabilityChange = (event) => { setHideUnavailable((prevValue) => !prevValue); };

    // Filter products based on category, price range, and availability
    const filteredProducts = products.filter((product) => {
        const productCategory = product.category.toLowerCase();
        const targetCategory = categoryName.toLowerCase();
        const formattedProductCategory = productCategory.replace(/\s+/g, '-').replace(/\//g, '-');
        const formattedTargetCategory = targetCategory.replace(/\s+/g, '-').replace(/\//g, '-');

        const matchesCategory = formattedProductCategory === formattedTargetCategory;
        const matchesPriceRange =
        !priceRange ||
        (priceRange === 'under-10' && product.price <= 10) ||
        (priceRange === '10-20' && product.price > 10 && product.price <= 20) ||
        (priceRange === 'over-20' && product.price > 20);

        const isVisible =
        !hideUnavailable || (hideUnavailable && product.availability !== 'unavailable');

        return matchesCategory && matchesPriceRange && isVisible;
    });

  

    return (
        <div className="category-container"> 
            <div className='filter-container'>
                <div className='rounded-container'>
                    <h1 className='filter-heading'>Price</h1>
                    <div className='checkbox-container'>
                        <label>
                            <input type='checkbox' name='price-range' value='under-10' checked={priceRange === 'under-10'} onChange={handlePriceRangeChange}/>
                            <span className='checkbox-label'>$0 - $10</span>
                        </label>
                        <label>
                            <input type='checkbox' name='price-range' value='10-20' checked={priceRange === '10-20'} onChange={handlePriceRangeChange}/>
                            <span className='checkbox-label'>$10 - $20</span>
                        </label>
                        <label>
                            <input type='checkbox' name='price-range' value='over-20' checked={priceRange === 'over-20'} onChange={handlePriceRangeChange}/>
                            <span className='checkbox-label'>$20+</span>
                        </label>
                    </div>
                    <div className="divider-container"><hr className="divider"/></div>
                    <h1 className='filter-heading'>Availability</h1>
                    <div className='checkbox-container'>
                        <label>
                            <input type='checkbox' name='availability' value='hide-unavailable' checked={hideUnavailable} onChange={handleAvailabilityChange}/>
                            <span className='checkbox-label'>Hide unavailable</span>
                        </label>
                    </div>
                </div>  
            </div>
            <div className='item-container'>
                <h1 className='category-header'>{getDisplayName(categoryName)}</h1>
                <div className="product-row">
                {filteredProducts.map((product) => (
                    <Link key={product._id} to={`/product/${product._id}`} className="none">
                        <div className="product-container">
                            <img src={`/products/${product.productImage}`} alt={product.productImage} className="product-image-cat" />
                            <p className="product-name-cat">{product.productName}</p>
                            <p className="product-price-cat">${formatPrice(product.price)}</p>
                        </div>
                    </Link>
                ))}
                </div>
            </div>
        </div>
    );
}

export default Category;