import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  //handle logout
  const handleLogout = async () => {
    try {
      await axios.post(`${BACKEND_URL}/api/v1/auth/logout`);
      localStorage.removeItem("authToken");
      toast.success("logout successfully ");
      navigate("/login");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      width={"100%"}
      backgroundColor={theme.palette.background.alt}
      p="1rem 6%"
      textAlign={"center"}
      sx={{ boxShadow: 3, mb: 2 }}
    >
      <Typography variant="h1" color="primary" fontWeight="bold">
        AI GPT-3.5
      </Typography>
      {loggedIn ? (
        <>
          <NavLink to="/" p={1}>
            Home
          </NavLink>
          <NavLink to="/login" onClick={handleLogout} p={1}>
            Logout
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/register" p={1}>
            Sign Up
          </NavLink>
          <NavLink to="/login" p={1}>
            Sign In
          </NavLink>
        </>
      )}
    </Box>
  );
};

export default Navbar;
