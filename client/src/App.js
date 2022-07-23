// REACT STUFF 
import React from 'react';

// ROUTER 
import { Routes, Route } from "react-router-dom";

// PAGES 
import Home from './pages/Home';
import Page404 from './pages/Page404';

// COMPONENTS 
import Navbar from './components/elements/Navbar';
import Footer from './components/elements/Footer';
import RequireAuth from './components/admin/RequiredAuth';
import NotLoggedIn from './components/admin/NotLoggedIn';
import Login from './components/login/Login';
import ResetPassword from './pages/ResetPassword';
import UpdateUser from './pages/UpdateUser';
import RefactorPassword from './components/login/RefactorPassword';

// STYLES 
import './App.css';
import { Box } from '@mui/material';
import useStyles from './styles/App.style.js';

function App() {
  // console.log("App.js - ", process.env.REACT_APP_KEY);

  const classes = useStyles();


  return (
    <Box className={classes.app} >
      <Routes >
        <Route path="/" element={
          <React.Fragment>
            <RequireAuth>
              <Navbar />
              <Home />
            </RequireAuth>
          </React.Fragment>
        } />
        <Route path="/home" element={
          <React.Fragment>
            <RequireAuth>
              <Navbar />
              <Home />
            </RequireAuth>
          </React.Fragment>
        } />

        <Route path="/update-user" element={
          <React.Fragment>
            <RequireAuth>
              <Navbar />
              <UpdateUser />
            </RequireAuth>
          </React.Fragment>
        } />

        {/* <Route path="/reset-password" element={
          <React.Fragment>
            <Navbar />
            <ResetPassword />
          </React.Fragment>
        } /> */}

        <Route path="/reset-password" element={<React.Fragment>
          <Navbar />
          <RefactorPassword />
        </React.Fragment>} />

        <Route path="/reset-password/:token" element={<React.Fragment>
          <Navbar />
          <ResetPassword />
        </React.Fragment>} />



        <Route path="/login" element={
          <NotLoggedIn>
            <Navbar />
            <Login />
          </NotLoggedIn>
        } />




        <Route path="*" element={
          <React.Fragment>
            <Navbar />
            <Page404 />
          </React.Fragment>
        } />

      </Routes>

      <Footer />
    </Box >
  );
}

export default App;
