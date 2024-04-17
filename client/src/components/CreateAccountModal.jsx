import * as React from "react";

import "../styles/CreateAccountModal.css";
import logo from "../images/logo.png";
import { Box, Button, Link, Modal, Stack, TextField, Typography } from "@mui/material";
export default function CreateAccountModal({ createAccountOpen, handleCreateAccountClose, handleLoginOpen }) {
    const [showErrorMessage, setShowErrorMessage] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("")
    const [userData, setUserData] = React.useState("")

    React.useEffect(() => {
      fetch("/getUsers")
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
        });
    }, []);

    const handleCreateAccount = () => {
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value;
        const cardInformation = document.getElementById('cardInformation').value;
        if (!firstName || !lastName || !username || !password || !email) {
            setErrorMessage("Please fill in all required fields")
            setShowErrorMessage(true);
        } else {
            const checkedUsername = userData.find(u => u.username === username);
            // username is already in the db
            if (checkedUsername) {
              setErrorMessage("Username already taken")
              setShowErrorMessage(true);
            } else {
              const newUser = {
                firstName: firstName,
                lastName: lastName,
                username: username,
                email: email,
                password: password,
                addresses: [{}],
                paymentInfo: [cardInformation ? {
                    cardType: "Main Card",
                    cardNumber: cardInformation,
                    expireDate: "",
                    cvv: ""
                } : {
                    cardType: "",
                    cardNumber: "",
                    expireDate: "",
                    cvv: ""
                }],
                wishlist: { productIds: [] },
                favorites: { productIds: [] },
                subscriptions: { productIds: [] },
                cart: {
                    items: [],
                    discountCode: ""
                }
              };
              postCreatedUser(newUser)
              document.cookie = `username=${username};path=/;max-age=600`; // cookie expires in 600 seconds (10 minutes)
              window.location.reload();
            }
            
        }
    };

    const handleCreateAccountCloseAndErrors = () => {
        setShowErrorMessage(false);
        handleCreateAccountClose();
    };

    const postCreatedUser = (newUser) => {
      fetch("/createUser", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(newUser)
      })
      .then(response => response.json())
      .then(data => {
          console.log("User account created successfully", data);
          alert("User account created succesfully")
          setShowErrorMessage(false);
          handleCreateAccountClose();
      })
      .catch(error => {
          console.error("Error creating user account", error);
          setErrorMessage("Failed to create account. Please try again.");
          setShowErrorMessage(true);
      });
    }
  return (
    <div>
      <Modal
        open={createAccountOpen}
        onClose={handleCreateAccountCloseAndErrors}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="main-create-account-modal-card">
          <Stack alignItems={"center"}>
            <img id="modal-logo" src={logo} />
            <Typography className="modal-text">Create Account</Typography>
            <br></br>
            <Stack direction={"row"} spacing={6}>
                <input type="text" id="firstName" name="firstName" placeholder="First Name" style={{height: "60px", width: "350px", paddingLeft: "10px", color: "black"}} />
                <input type="text" id="lastName" name="lastName" placeholder="Last Name" style={{height: "60px", width: "350px", paddingLeft: "10px", color: "black"}} />
            </Stack>
            <br></br>
            <Stack direction={"row"} spacing={6}>
                <input type="text" id="username" name="username" placeholder="Username" style={{height: "60px", width: "350px", paddingLeft: "10px", color: "black"}} />
                <input type="password" id="password" name="password" placeholder="Password" style={{height: "60px", width: "350px", paddingLeft: "10px", color: "black"}} />
            </Stack>
            <br></br>
            <Stack direction={"row"} spacing={6}>
                <input type="text" id="email" name="email" placeholder="Email" style={{height: "60px", width: "350px", paddingLeft: "10px", color: "black"}} />
                <input type="text" id="cardInformation" name="cardInformation" placeholder="Card Information (optional)" style={{height: "60px", width: "350px", paddingLeft: "10px", color: "black"}} />
            </Stack>
            <br></br>
            <Link href="#" onClick={() => { handleCreateAccountCloseAndErrors(); handleLoginOpen();}} className="white-link">Already have an account? <br />Log In</Link>
            { showErrorMessage ? <div><p className="error-message">{errorMessage}</p></div>
            : <br></br>}
            <Button type="button" className="login-button" onClick={handleCreateAccount}>Create Account</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}