import * as React from "react";

import "../styles/CreateAccountModal.css";
import logo from "../images/logo.png";
import { Box, Button, Link, Modal, Stack, TextField, Typography } from "@mui/material";
export default function CreateAccountModal({ createAccountOpen, handleCreateAccountClose, handleLoginOpen }) {
    const [showErrorMessage, setShowErrorMessage] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("")

    const handleCreateAccount = () => {
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const cardInformation = document.getElementById('cardInformation').value;
        if (!firstName || !lastName || !username | !password) {
            setErrorMessage("Please fill in all required fields")
            setShowErrorMessage(true);
        } else {
            setShowErrorMessage(false);
        }
    };

    const handleCreateAccountCloseAndErrors = () => {
        setShowErrorMessage(false);
        handleCreateAccountClose();
    };  
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
                <input type="text" id="firstName" name="firstName" placeholder="First Name" style={{height: "60px", width: "350px"}} />
                <input type="text" id="lastName" name="lastName" placeholder="Last Name" style={{height: "60px", width: "350px"}} />
            </Stack>
            <br></br>
            <Stack direction={"row"} spacing={6}>
                <input type="text" id="username" name="username" placeholder="Username" style={{height: "60px", width: "350px"}} />
                <input type="password" id="password" name="password" placeholder="Password" style={{height: "60px", width: "350px"}} />
            </Stack>
            <br></br>
            <input type="text" id="cardInformation" name="cardInformation" placeholder="Card Information (optional)" style={{height: "60px", width: "749px"}} />
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