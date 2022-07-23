import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button,
} from '@mui/material';
import { Logout, Menu, RestartAlt, Upgrade, VpnKey} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = (Props) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  function logout(e) {
    e.preventDefault();
    localStorage.removeItem('token');
    navigate('/login');
  }

  const linkStyle = {
    color: "white",
    textDecoration: "none"
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Menu />
          </Button>
          {token && (
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/" style={linkStyle}>Home</Link>
            </Typography>
          )}
          {!token && (
            <Button color="inherit" startIcon={<VpnKey />} >
              <Link to="/update-user" style={linkStyle} >login</Link>
            </Button>
          )}
          {token && (
            <Button color="inherit"  startIcon={<RestartAlt />}  >
              <Link to="/reset-password" style={linkStyle}>Reset Password</Link>
            </Button>
          )}
          {token && (
            <Button color="inherit"  startIcon={<Upgrade />}>
              <Link to="/update-user" style={linkStyle} > Update User</Link>
            </Button>
          )}
          {token && (
            <Button variant="contained" color="error" startIcon={<Logout />} onClick={logout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
