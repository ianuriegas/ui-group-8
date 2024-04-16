import * as React from "react";

import "../styles/ForgotPasswordModal.css";
import logo from "../images/logo.png";
import { Box, Button, Link, Modal, Stack, Typography } from "@mui/material";
export default function ForgotPasswordModal({ forgotPasswordOpen, handleForgotPasswordClose, handleLoginOpen }) {
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

  const handleForgotPassword = () => {
    const email = document.getElementById('email').value;

    if (!email) {
      setErrorMessage("Please enter email")
      setShowErrorMessage(true);
    } else {
      const checkedEmail = userData.find(u => u.email === email);
      if (checkedEmail) {
        setShowErrorMessage(false);
        handleForgotPasswordClose();
        alert("Email sent! Check you inbox for instructions on how to reset your password.")
      } else{
        setErrorMessage("Email is not registered with an account")
        setShowErrorMessage(true);
      }
    }
  };

  const handleForgotPasswordCloseAndErrors = () => {
    setShowErrorMessage(false);
    handleForgotPasswordClose();
  };  
    return (
    <div>
      <Modal
        open={forgotPasswordOpen}
        onClose={handleForgotPasswordCloseAndErrors}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="main-forgot-password-modal-card">
          <Stack alignItems={"center"}>
            <img id="modal-logo" src={logo} />
            <Typography className="modal-text">Forgot Password</Typography>
            <br></br>
            <input type="text" id="email" name="email" placeholder="Enter email" style={{height: "60px", width: "350px", paddingLeft: "10px", color: "black"}} />
            <br></br>
            <Link onClick={() => { handleForgotPasswordCloseAndErrors(); handleLoginOpen();}} className="white-link">Back to login</Link>
            { showErrorMessage ? <div><p className="error-message">{errorMessage}</p></div>
            : <br></br>}
            <Button type="button" className="login-button" onClick={handleForgotPassword}>Send Code</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}