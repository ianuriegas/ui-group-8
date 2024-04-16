import * as React from "react";
import "../styles/LoginModal.css";
import logo from "../images/logo.png";
import { Box, Button, Link, Modal, Stack, Typography } from "@mui/material";

export default function LoginModal({ loginOpen, handleLoginClose, handleCreateAccountOpen, handleForgotPasswordOpen }) {
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

  const handleLogin = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
      setErrorMessage("Incorrect username or password")
      setShowErrorMessage(true);
    } else {
      const user = userData.find(u => u.username === username && u.password === password);
      // succesful login (username and password found in db)
      if (user) {
        console.log("Found a match");
        document.cookie = `username=${username};path=/;max-age=600`; // cookie expires in 600 seconds (10 minutes)
        setShowErrorMessage(false);
        handleLoginClose();
        alert("Sucessfully logged in!");
        window.location.reload();
      } else {
        setErrorMessage("Incorrect username or password");
        setShowErrorMessage(true);
      }
    }
  };

  const handleLoginCloseAndErrors = () => {
    setShowErrorMessage(false);
    handleLoginClose();
  };

  return (
    <div>
      <Modal
        open={loginOpen}
        onClose={handleLoginCloseAndErrors}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="main-login-modal-card">
          <Stack alignItems={"center"}>
            <img id="modal-logo" src={logo} />
            <Typography className="modal-text">Log In</Typography>
            <br></br>
            <input type="text" id="username" name="username" placeholder="Username" style={{height: "60px", width: "350px", paddingLeft: "10px", color: "black"}} />
            <br></br>
            <input type="password" id="password" name="password" placeholder="Password" style={{height: "60px", width: "350px", paddingLeft: "10px", color: "black"}} />
            <br></br>
            <Stack direction={"row"} sx={{ width: '65%', justifyContent: 'space-between' }} className="stack-row">
                <Link onClick={() => { handleLoginCloseAndErrors(); handleForgotPasswordOpen();}} className="white-link">Forgot Password</Link>
                <Link onClick={() => { handleLoginCloseAndErrors(); handleCreateAccountOpen();}} className="white-link">Create Account</Link>
            </Stack>
            { showErrorMessage ? <div><p className="error-message">{errorMessage}</p></div>
            : <br></br>}
            <Button type="button" className="login-button" onClick={handleLogin}>Log In</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}