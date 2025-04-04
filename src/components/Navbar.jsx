// import React from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/register");
  };
 

  const token = localStorage.getItem("token");
  console.log(token);

  const userName = token ? JSON.parse(atob(token.split(".")[1])).name : null;
  const docName = token ? JSON.parse(atob(token.split(".")[1])).id : null;
  console.log(docName);
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const iconStyle = { "--fa-animation-duration": "0.5s", color: "red" };
  const redirectToHome = () => {
    navigate("/");
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        color={"darkcyan"}
        component={"div"}
        sx={{ flexGrow: 1, my: 2 }}
        variant="h5"
      >
        <sup>
          Trust<sub>Cure</sub>
          <i className="fa-solid fa-heart fa-beat" style={{ iconStyle }}></i>
        </sup>
      </Typography>
      <Divider />
      {/* <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        sx={{ mr: 2, display: { sm: "none" } }}
        onClick={handleDrawerToggle}
      >
        <MenuIcon />
      </IconButton> */}

      <ul className="mobile-navigation text-white">
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/about">About Us</Link>
        </li>
        <li>
          <Link to="/feedback">FeedBack</Link>
        </li>
      </ul>
    </Box>
  );
  return (
    <Box>
      <AppBar
        component={"nav"}
        sx={{
          bgcolor: "rgb(40,48,115)",
          backdropFilter: "blur(20px)",
          borderRadius: "0 0 15px 15px",
        }}
      >
        <Toolbar>
          <Typography
            color={"darkcyan"}
            component={"div"}
            sx={{ flexGrow: 1 }}
            variant="h5"
          >
            <div
              className="text-white"
              style={{ color: "var(--logo-color)", cursor: "pointer" }}
              onClick={redirectToHome}
            >
              <sup style={{ fontWeight: 600 }}>
                Trust<sub>Cure</sub>
                <i className="fa-solid fa-heart fa-beat" style={iconStyle}></i>
              </sup>
            </div>
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, display: { sm: "none" } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Box component={"div"} sx={{ display: { xs: "none", sm: "block" } }}>
            <ul className="navigation-menu text-white">
              <li className="text-white">
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/feedback">FeedBack</Link>
              </li>
              {userName ? (
                <div className="mr-5">
                  <li>
                    <a href="#">{userName}</a>
                    <ul className="dropdown">
                      <li className="p-2">
                        <a href="/profile">Profile</a>
                      </li>
                      <li className="p-2">
                        <a onClick={handleLogout} href="/login">
                          Logout
                        </a>
                      </li>
                    </ul>
                  </li>
                </div>
              ) : (
                <li>
                  <Link
                    style={{ color: "var(--heading-color)" }}
                    to="/register"
                  >
                    Login/Register
                  </Link>
                </li>
              )}
            </ul>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          anchor="right"
          onClose={handleDrawerToggle}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "270px",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Toolbar />
    </Box>
  );
}

export default Navbar;
