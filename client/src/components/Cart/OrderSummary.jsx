import { useState } from "react";
import { FaPlus, FaChevronDown } from "react-icons/fa";
import AddAddressModal from "./AddAddressModal";
import "../../styles/Cart.css";

const OrderSummary = ({ items, _addresses, _cards }) => {
  const [isDelivery, setIsDelivery] = useState(true);
  const [addresses, setAddresses] = useState(_addresses);
  const [cards, setcards] = useState(_cards);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isExpandedAddress, setIsExpandedAddress] = useState(true);
  const [isExpandedCard, setIsExpandedCard] = useState(true);
  const [selectedCard, setSelectedCard] = useState("");
  const [code, setCode] = useState("");

  const calculateTotal = (items) => {
    return items
      .reduce((total, item) => total + item.price * item.quant, 0)
      .toFixed(2);
  };

  const handleSelectAddress = (id) => {
    setSelectedAddressId(id);
  };

  const toggleExpandAddress = () => {
    setIsExpandedAddress(!isExpandedAddress);
  };

  const toggleExpandCard = () => {
    setIsExpandedCard(!isExpandedCard);
  };

  const handleCodeApply = () => {
    console.log(code);
  };

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      <div className="delivery-pickup-toggle">
        <p
          className={`delivery-pickup-toggle-${
            isDelivery ? "selected" : "default"
          }`}
          onClick={() => setIsDelivery(true)}
        >
          Delivery
        </p>
        <p
          className={`delivery-pickup-toggle-${
            isDelivery ? "default" : "selected"
          }`}
          onClick={() => setIsDelivery(false)}
        >
          Pickup
        </p>
      </div>
      <div className="address-selector">
        <div className="collapsible-header" onClick={toggleExpandAddress}>
          <h3 className="text-xl font-bold">Address</h3>
          <FaChevronDown
            className={`collapsible-arrow ${
              isExpandedAddress ? "expanded" : ""
            }`}
          />
        </div>
        <hr></hr>
        <div
          className={`expandable-list ${isExpandedAddress ? "expanded" : ""}`}
        >
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`address-item ${
                selectedAddressId === address.id ? "selected" : ""
              }`}
              onClick={() => handleSelectAddress(address.id)}
            >
              <input
                type="radio"
                id={`address${address.id}`}
                name="address"
                value={address.id}
                checked={selectedAddressId === address.id}
                onChange={() => handleSelectAddress(address.id)}
              />
              <label htmlFor={`address${address.id}`} className="text-lg">
                {`${address.street}, ${address.city}, ${address.state}, ${address.postalCode}, ${address.country}`}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="payment-selector mb-12">
        <div className="collapsible-header" onClick={toggleExpandCard}>
          <h3 className="text-xl font-bold">Select Card</h3>
          <FaChevronDown
            className={`collapsible-arrow ${isExpandedCard ? "expanded" : ""}`}
          />
        </div>
        <hr></hr>
        <div className={`expandable-list ${isExpandedCard ? "expanded" : ""}`}>
          <div className="relative">
            <select
              id="card-select"
              value={selectedCard}
              onChange={(e) => setSelectedCard(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 bg-white text-sm rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              {cards.map((card) => (
                <option key={card.id} value={card.id}>
                  {`${card.cardType} **** **** **** ${card.cardNumber.slice(
                    -4
                  )}`}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              {/* Icon or additional content goes here */}
            </div>
          </div>
        </div>
      </div>
      <div className="discount-code mb-[50px]">
        <div className="space-y-4">
          <div className="text-xl font-bold">Discount Code</div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <input
              type="text"
              id="discount-code"
              placeholder="Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-grow p-2 text-sm font-bold border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              onClick={handleCodeApply}
              className="px-5 py-2 text-sm text-center text-white bg-orange-500 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
      <div className="total mb-[30px]">
        <div className="flex justify-between items-center">
          <span className="text-3xl font-extrabold">Total :</span>
          <span className="text-3xl font-extrabold text-[#275143]">
            ${calculateTotal(items)}
          </span>
        </div>
      </div>
      <button className="checkout-button">Checkout</button>
    </div>
  );
};

export default OrderSummary;
