import React, { useEffect } from "react";
import "../styles/AccountPage.css";
import ItemCard1 from "./ItemCard1";
import appleImg from "../images/apples.jpg";
import cerealImg from "../images/cereal.webp";
import pencil from "../images/pencil.png";
import check from "../images/check-mark.png";
import x from "../images/close.png";
import { useState } from "react";

const AccountPage = ({ username }) => {
  const [isOpen, changeToggle] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState();
  const [selectedCard, setSelectedCard] = useState();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [subscriptionItems, setSubscriptionItems] = useState([]);
  const [cards, setCards] = useState([]);
  const [user, setUser] = useState({});

  const getProducts = async (productIds) => {
    const products = [];

    for (const id of productIds) {
      try {
        const response = await fetch(`/getProducts/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const product = await response.json();
        products.push(product);
      } catch (error) {
        console.error("Error fetching product with id " + id, error);
      }
    }

    return products;
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
    if (user) {
      setAddresses(user.addresses);
      setCards(user.paymentInfo);
      getProducts(user.wishlist?.productIds)
        .then((products) => setWishlistItems(products))
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
      getProducts(user.favorites?.productIds)
        .then((products) => setFavoriteItems(products))
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
      getProducts(user.subscriptions?.productIds)
        .then((products) => setSubscriptionItems(products))
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }
  }, [user]);

  function showEdit(classname, classname2) {
    const element = document.querySelector(classname);
    const element2 = document.querySelector(classname2);
    if (isOpen === false) {
      element.style.display = "none";
      element2.style.display = "grid";
    } else {
      element2.style.display = "none";
      element.style.display = "grid";
    }
    changeToggle(!isOpen);
  }
  function hideEdit(classname, classname2) {
    const element = document.querySelector(classname);
    const element2 = document.querySelector(classname2);

    element.style.display = "grid";
    element2.style.display = "none";
  }
  function updateInfo(class1, class2) {
    if (class1 === ".non-edit-a") {
      if (selectedAddress.id == -1) {
        fetch("/addAddress", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, newAddress: selectedAddress }),
        })
          .then((response) => {
            hideEdit(class1, class2);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
            setAddresses((prevAddresses) => [
              ...prevAddresses,
              selectedAddress,
            ]);
          });
      } else {
        addresses[selectedAddress.id] = selectedAddress;
        fetch("/replaceAddress", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, addresses }),
        })
          .then((response) => {
            hideEdit(class1, class2);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
            setAddresses([...addresses]);
          })
          .catch((error) => console.error("Error:", error));
      }
    }
    if (class1 === ".non-edit-b") {
      if (selectedCard.id == -1) {
        fetch("/addPaymentMethod", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, newPaymentMethod: selectedCard }),
        })
          .then((response) => {
            hideEdit(class1, class2);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
            setCards((prevCards) => [...prevCards, selectedCard]);
          });
      } else {
        cards[selectedCard.id] = selectedCard;
        fetch("/replacePaymentInfo", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, paymentInfo: cards }),
        })
          .then((response) => {
            hideEdit(class1, class2);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
            setCards([...cards]);
          })
          .catch((error) => console.error("Error:", error));
      }
    }

    hideEdit(class1, class2);
  }
  return (
    <div className="account-page-container">
      <h1 id="account-name">
        {user.firstName} {user.lastName}
      </h1>
      <div className="personal">
        <div className="personal-info-label">Personal Information</div>
        <div className="address-container">
          <div className="address-label-c">
            <div className="flex items-center space-x-4">
              <div className="font-semibold text-3xl">Address:</div>
              <select
                className="bg-gray-100 p-2 rounded border text-black"
                value={selectedAddress ? selectedAddress.street : ""}
                onChange={(e) => {
                  const selected = addresses?.find(
                    (addr) => addr.street === e.target.value
                  ) ?? {
                    street: "",
                    state: "",
                    country: "",
                    postalCode: "",
                    city: "",
                  };
                  selected.id = addresses?.indexOf(selected) ?? -1;
                  setSelectedAddress(selected);
                }}
              >
                <option></option>
                <option value="Add New Address">Add New Address</option>
                {addresses?.map((address, index) => (
                  <option key={index} value={address.street}>
                    {address.street}
                  </option>
                ))}
              </select>
              <button
                onClick={() => showEdit(".non-edit-a", ".editable-a")}
                className="edit"
              >
                <img src={pencil} alt="" />
              </button>
            </div>
          </div>
          {selectedAddress && (
            <>
              <div className="non-edit-a">
                <div className="label col1 row1">Street</div>
                <div className="label col1 row2">City</div>
                <div className="label col1 row3">State</div>
                <div className="label col1 row4">Postal Code</div>
                <div className="label col1 row5">Country</div>

                <div className="values col2 row1">{selectedAddress.street}</div>
                <div className="values col2 row2">{selectedAddress.city}</div>
                <div className="values col2 row3">{selectedAddress.state}</div>
                <div className="values col2 row4">
                  {selectedAddress.postalCode}
                </div>
                <div className="values col2 row5">
                  {selectedAddress.country}
                </div>
              </div>

              <div className="editable-a">
                <div className="label col1 row1">Street</div>
                <div className="label col1 row2">City</div>
                <div className="label col1 row3">State</div>
                <div className="label col1 row4">Postal Code</div>
                <div className="label col1 row5">Country</div>

                <input
                  className="addressInput col2 row1"
                  type="text"
                  name="streetinput"
                  id="streetInput"
                  value={selectedAddress.street}
                  onChange={(e) => {
                    const newStreet = e.target.value;
                    setSelectedAddress({
                      ...selectedAddress,
                      street: newStreet,
                    });
                  }}
                />
                <input
                  className="addressInput col2 row2"
                  type="text"
                  name="cityinput"
                  id="cityInput"
                  value={selectedAddress.city}
                  onChange={(e) => {
                    const newCity = e.target.value;
                    setSelectedAddress({
                      ...selectedAddress,
                      city: newCity,
                    });
                  }}
                />
                <input
                  className="addressInput col2 row3"
                  type="text"
                  name="stateinput"
                  id="stateInput"
                  value={selectedAddress.state}
                  onChange={(e) => {
                    const newState = e.target.value;
                    setSelectedAddress({
                      ...selectedAddress,
                      state: newState,
                    });
                  }}
                />
                <input
                  className="addressInput col2 row4"
                  type="text"
                  name="postalinput"
                  id="postalInput"
                  value={selectedAddress.postalCode}
                  onChange={(e) => {
                    const newPostalCode = e.target.value;
                    setSelectedAddress({
                      ...selectedAddress,
                      postalCode: newPostalCode,
                    });
                  }}
                />
                <input
                  className="addressInput col2 row5 "
                  type="text"
                  name="countryinput"
                  id="countryInput"
                  value={selectedAddress.country}
                  onChange={(e) => {
                    const newCountry = e.target.value;
                    setSelectedAddress({
                      ...selectedAddress,
                      country: newCountry,
                    });
                  }}
                />
                <div className="icons-container row5">
                  <button
                    onClick={() => updateInfo(".non-edit-a", ".editable-a")}
                    type="submit"
                  >
                    <img src={check} alt="check mark" />
                  </button>
                  <button
                    onClick={() => hideEdit(".non-edit-a", ".editable-a")}
                    type="submit"
                  >
                    <img src={x} alt="cancel" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="card-info-container">
          <div className="address-label-c">
            <div className="flex items-center space-x-4">
              <div className="font-semibold text-3xl">Cards:</div>
              <select
                className="bg-gray-100 p-2 rounded border text-black"
                value={cards ? cards.cardNumber : ""}
                onChange={(e) => {
                  const selected = cards?.find(
                    (card) => card.cardNumber === e.target.value
                  ) ?? {
                    cardType: "",
                    cardNumber: "",
                    expireDate: "",
                    cvv: "",
                  };
                  selected.id = cards?.indexOf(selected) ?? -1;
                  setSelectedCard(selected);
                }}
              >
                <option></option>
                <option value="Add New Card">Add New Card</option>
                {cards?.map((card, index) => (
                  <option key={index} value={`${card.cardNumber}`}>
                    {`${card.cardType} ending with ${card.cardNumber.substring(
                      card.cardNumber.length - 4
                    )}`}
                  </option>
                ))}
              </select>
              <button
                onClick={() => showEdit(".non-edit-b", ".editable-b")}
                className="edit"
              >
                <img src={pencil} alt="" />
              </button>
            </div>
          </div>
          {selectedCard && (
            <>
              <div className="non-edit-b">
                <div className="label col1 row1">Card Type</div>
                <div className="label col1 row2">Card Number</div>
                <div className="label col1 row3">Expire Date</div>
                <div className="label col1 row4">CVV</div>

                <div className="values col2 row1">{selectedCard.cardType}</div>
                <div className="values col2 row2">
                  {selectedCard.cardNumber}
                </div>
                <div className="values col2 row3">
                  {selectedCard.expireDate}
                </div>
                <div className="values col2 row4">{selectedCard.cvv}</div>
              </div>

              <div className="editable-b">
                <div className="label col1 row1">Card Type</div>
                <div className="label col1 row2">Card Number</div>
                <div className="label col1 row3">Expire Date</div>
                <div className="label col1 row4">CVV</div>

                <input
                  className="addressInput col2 row1"
                  type="text"
                  name="cardtypeinput"
                  id="cardTypeInput"
                  value={selectedCard.cardType}
                  onChange={(e) => {
                    const newCardType = e.target.value;
                    setSelectedCard({
                      ...selectedCard,
                      cardType: newCardType,
                    });
                  }}
                />
                <input
                  className="addressInput col2 row2"
                  type="text"
                  name="cardnuminput"
                  id="cardNumInput"
                  value={selectedCard.cardNumber}
                  onChange={(e) => {
                    const newCardNumber = e.target.value;
                    setSelectedCard({
                      ...selectedCard,
                      cardNumber: newCardNumber,
                    });
                  }}
                />
                <input
                  className="addressInput col2 row3"
                  type="text"
                  name="expdateinput"
                  id="expireDateInput"
                  value={selectedCard.expireDate}
                  onChange={(e) => {
                    const newExpireDate = e.target.value;
                    setSelectedCard({
                      ...selectedCard,
                      expireDate: newExpireDate,
                    });
                  }}
                />
                <input
                  className="addressInput col2 row4"
                  type="text"
                  name="cvvinput"
                  id="cvvInput"
                  value={selectedCard.cvv}
                  onChange={(e) => {
                    const newCvv = e.target.value;
                    setSelectedCard({
                      ...selectedCard,
                      cvv: newCvv,
                    });
                  }}
                />
                <div className="icons-container row4">
                  <button
                    onClick={() => updateInfo(".non-edit-b", ".editable-b")}
                    type="submit"
                  >
                    <img src={check} alt="check mark" />
                  </button>
                  <button
                    onClick={() => hideEdit(".non-edit-b", ".editable-b")}
                    type="submit"
                  >
                    <img src={x} alt="cancel" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="wishlist">
        <div className="header-row">
          <div className="sect-headers">Wishlist</div>
          <form className="check-container">
            <div>
              <label>
                <input type="checkbox" className="checkbox" /> Hide Unavailable
              </label>
            </div>
          </form>
        </div>
        <div className="sub-items-container">
          {wishlistItems.map((item) => (
            <ItemCard1
              key={item._id}
              img={`/products/${item.productImage}`}
              name={item.productName}
            />
          ))}
        </div>
      </div>
      <div className="favorites">
        <div className="header-row">
          <div className="sect-headers">Favorites</div>
          <form className="check-container">
            <div>
              <label>
                <input type="checkbox" className="checkbox" /> Hide Unavailable
              </label>
            </div>
          </form>
        </div>
        <div className="sub-items-container">
          {favoriteItems.map((item) => (
            <ItemCard1
              key={item._id}
              img={`/products/${item.productImage}`}
              name={item.productName}
            />
          ))}
        </div>
      </div>

      <div className="subscriptions">
        <div className="header-row">
          <div className="sect-headers">Subscriptions</div>
          <form className="check-container">
            <div>
              <label>
                <input type="checkbox" className="checkbox" /> Hide Unavailable
              </label>
            </div>
          </form>
        </div>
        <div className="sub-items-container">
          {subscriptionItems.map((item) => (
            <ItemCard1
              key={item._id}
              img={`/products/${item.productImage}`}
              name={item.productName}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
