import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { VirtualList } from 'react-virtualized';
import "../styles/Category.css"

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/getProducts'); // Assumes server is running on the same host/port
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const productsList = await response.json();
        setProducts(productsList); // Update products state with fetched data
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  // Function to get the display name for the category
  const getDisplayName = (categoryName) => {
    return categoryDisplayName[categoryName] || categoryName;
  };

  // Filter products based on the category (case-insensitive comparison)
  const filteredProducts = products.filter((product) => {
    const productCategory = product.category.toLowerCase();
    const targetCategory = categoryName.toLowerCase();
  
    // Replace spaces and special characters like "/" with a hyphen (-) for comparison
    const formattedProductCategory = productCategory.replace(/\s+/g, '-').replace(/\//g, '-');
    const formattedTargetCategory = targetCategory.replace(/\s+/g, '-').replace(/\//g, '-');
  
    return formattedProductCategory === formattedTargetCategory;
  });

  const formatPrice = (price) => { return `${price.toFixed(2)}`; };

  return (
    <div className="category-container"> 
        <div className='filter-container'>
            <div className='rounded-container'>
                <h1 className='filter-heading'>Price</h1>
                <div className='checkbox-container'>
                    <label>
                        <input type='checkbox' name='price-range' value='under-10' />
                        <span className='checkbox-label'>$0 - $10</span>
                    </label>
                    <label>
                        <input type='checkbox' name='price-range' value='10-20' />
                        <span className='checkbox-label'>$10 - $20</span>
                    </label>
                    <label>
                        <input type='checkbox' name='price-range' value='over-20' />
                        <span className='checkbox-label'>$20+</span>
                    </label>
                </div>
                <div className="divider-container"><hr className="divider" /></div>
                <h1 className='filter-heading'>Availability</h1>
                <div className='checkbox-container'>
                    <label>
                        <input type='checkbox' name='availability' value='hide-unavailable' />
                        <span className='checkbox-label'>Hide unavailable</span>
                    </label>
                </div>
            </div>  
        </div>
        <div className='item-container'>
            <h1 className='category-header'>{getDisplayName(categoryName)}</h1>
            <div className="product-row">
              {filteredProducts.map((product) => (
                <div key={product._id} className="product-container">
                  <img src={`/products/${product.productImage}`} alt={product.productImage} className="product-image" />
                  <p className="product-name">{product.productName}</p>
                  <p className="product-price">${formatPrice(product.price)}</p>
                </div>
              ))}
            </div>
        </div>
    </div>
  );
}

export default Category;