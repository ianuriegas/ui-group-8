import { useState } from 'react';
import '../../styles/Cart.css'

const AddAddressModal = ({ closeModal, addNewAddress }) => {
   const [newAddress, setNewAddress] = useState('');
 
   const handleSubmit = (event) => {
     event.preventDefault();
     addNewAddress(newAddress);
     closeModal();
   };
 
   return (
      <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add New Address</h2>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <label htmlFor="newAddress" className="modal-label">New Address</label>
          <input
            type="text"
            id="newAddress"
            className="modal-input"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            required
          />
          <div className="modal-buttons">
            <button type="button" onClick={closeModal} className="modal-button cancel-button">
              Cancel
            </button>
            <button type="submit" className="modal-button submit-button">
              Add Address
            </button>
          </div>
        </form>
      </div>
    </div>
   );
 }

 export default AddAddressModal;