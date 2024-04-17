import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import "../../styles/Cart.css";
import OrderSummary from "./OrderSummary";

const Cart = ({ username }) => {
  const [user, setUser] = useState({});
  const [discountCode, setDiscountCode] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [cards, setCards] = useState([]);

  const updateCart = async (updatedItems) => {
    const newCartObj = { items: [], discountCode: discountCode };
    for (const item of updatedItems) {
      newCartObj.items.push({ productId: item._id, quantity: item.quant });
    }
    console.log(newCartObj);
    try {
      const response = await fetch("/replaceCart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, cart: newCartObj }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Cart replaced successfully:", data);
      return data;
    } catch (error) {
      console.error("Error replacing cart:", error);
    }
  };
  const buildCart = async (items) => {
    const cart = [];

    for (const { productId, quantity } of items) {
      try {
        const response = await fetch(`/getProducts/${productId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const product = await response.json();
        product.quant = quantity;
        cart.push(product);
      } catch (error) {
        console.error("Error fetching product with id " + productId, error);
      }
    }
    return cart;
  };

  useEffect(() => {
    fetch(`/getUserFromUsername?username=${encodeURIComponent(username)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error("Error:", error));
  }, [username]);

  useEffect(() => {
    if (user && user.firstName) {
      console.log(user.cart?.items);
      buildCart(user.cart?.items)
        .then((cart) => setItems(cart))
        .catch((error) => console.error(error));
      setAddresses(user.addresses);
      setCards(user.paymentInfo);
    }
  }, [user]);

  const [items, setItems] = useState();

  const handleQuantityChange = (index, newQuantity) => {
    const updatedItems = items
      .map((item, i) => {
        if (i === index) {
          return { ...item, quant: newQuantity };
        }
        return item;
      })
      .filter((item) => item.quant > 0);
    setItems(updatedItems);
    updateCart(updatedItems);
  };
  return (
    items && (
      <>
        <div className="cart-container">
          <div className="review-cart">
            <h2>Review Cart</h2>
            <div>
              {items.map((item, index) => (
                <CartItem
                  key={index}
                  itemName={item.productName}
                  imgSrc={`products/${item.productImage}`}
                  price={item.price?.toFixed(2)}
                  quant={item.quant}
                  onQuantityChange={(newQuantity) =>
                    handleQuantityChange(index, newQuantity)
                  }
                />
              ))}
            </div>
          </div>
          <OrderSummary items={items} _addresses={addresses} _cards={cards}/>
        </div>
      </>
    )
  );
};

export default Cart;
