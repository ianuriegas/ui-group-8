import * as React from "react";

import "../styles/ForgotPasswordModal.css";
import logo from "../images/logo.png";
import { Box, Button, Link, Modal, Stack, TextField, Typography } from "@mui/material";
export default function ForgotPasswordModal({ forgotPasswordOpen, handleForgotPasswordClose, handleLoginOpen }) {
  return (
    <div>
      <Modal
        open={forgotPasswordOpen}
        onClose={handleForgotPasswordClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="main-forgot-password-modal-card">
          <Stack alignItems={"center"}>
            <img id="modal-logo" src={logo} />
            <Typography className="modal-text">Forgot Password</Typography>
            <br></br>
            <input type="text" id="email" name="email" placeholder="Enter email" style={{height: "60px", width: "350px"}} />
            <br></br>
            <Link onClick={() => { handleForgotPasswordClose(); handleLoginOpen();}} className="white-link">Back to login</Link>

            <br></br>
            <Button type="button" className="login-button">Send Code</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}