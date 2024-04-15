import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../styles/ProductDetails.css"

function ProductDetails() {
  const { productId } = useParams();
  const [products, setProducts] = useState([]);

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

  return (
    <div className="details-container">
      {filteredProduct ? (
        <>
          <div className="left-container">
            <div className='product-image'><img src={`/products/${filteredProduct.productImage}`} alt={filteredProduct.productImage} className="product-image" /></div>
            <p>Description: {filteredProduct.description}</p>
          </div>
          <div className="right-container">
            <h2>{filteredProduct.productName}</h2>
          </div>
        </>
      ) : (
        <p>Loading...</p> // Handle case where product is not found
      )}
    </div>
  );
}

export default ProductDetails;