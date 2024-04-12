import * as React from "react";

import "../styles/LoginModal.css";
import logo from "../images/logo.png";
import { Box, Button, Link, Modal, Stack, TextField, Typography } from "@mui/material";
export default function LoginModal({ open, handleOpen, handleClose }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="main-modal-card">
          <Stack alignItems={"center"}>
            <img id="modal-logo" src={logo} />
            <Typography className="modal-text">Log In</Typography>
            <br></br>
            <input type="text" id="username" name="username" placeholder="Username" style={{height: "60px", width: "350px"}} />
            <br></br>
            <input type="text" id="password" name="password" placeholder="Password" style={{height: "60px", width: "350px"}} />
            <br></br>
            <Stack direction={"row"} sx={{ width: '65%', justifyContent: 'space-between' }} className="stack-row">
    <Link href="#" className="white-link">Forgot Password</Link>
    <Link href="#" className="white-link">Create Account</Link>
</Stack>

            <br></br>
            <Button type="button" className="login-button">Log In</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}