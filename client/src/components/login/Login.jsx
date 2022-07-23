// REACT AND REACT ROUTER
import React, { useState } from 'react';

// REDUX
import { Link } from 'react-router-dom';

// MATERIAL UI
import { Box, Container, Typography } from '@mui/material';
import useStyles from '../../styles/Admin.style.js';

// CUSTOM COMPONENT
import Loader from '../elements/Loader';
import CustomModal from '../elements/CustomModal';
import Register from './Register';
import LoginElement from './LoginElement';
import RefactorPassword from './RefactorPassword.jsx';

const REGISTER = 'REGISTER',
  LOGIN = 'LOGIN',
  RECOVER = 'RECOVER';

const Login = (props) => {
  const classes = useStyles();

  const [currentComponent, setCurrentComponent] = useState(LOGIN);

  function showElement() {
    switch (currentComponent) {
      case REGISTER:
        return (
          <React.Fragment>
            <Register title="Sign Up" />
            <Box my={5}>
              <Typography variant="h6" component="a">
                Already registered ?
              </Typography>
              <Typography
                variant="a"
                onClick={(e) => setCurrentComponent(LOGIN)}
                component="a"
              >
                login.
              </Typography>
            </Box>
          </React.Fragment>
        );
      case LOGIN:
        return (
          <React.Fragment>
            <LoginElement title="Login" />
            <Box my={5}>
              <Typography variant="h6" component="a">
                Don't you have an account ?{' '}
              </Typography>
              <Typography
                variant="a"
                onClick={(e) => setCurrentComponent(REGISTER)}
                component="a"
              >
                create one.
              </Typography>
              <br />
              <Typography
                variant="h6"
                component="a"
                onClick={(e) => setCurrentComponent(RECOVER)}
              >
                Forget password?
              </Typography>
              {/* <Link to="/reset-password" style={{color: 'white', textDecoration: "none"}}>Forget password?</Link> */}
            </Box>
          </React.Fragment>
        );
      case RECOVER:
        return (
          <React.Fragment>
            <RefactorPassword />
            <Box my={5}>
              <Typography
                variant="a"
                onClick={(e) => setCurrentComponent(LOGIN)}
                component="a"
              >
                Remember password?
              </Typography>
            </Box>
          </React.Fragment>
        );
      default:
        setCurrentComponent(LOGIN);
    }
  }

  //  TOGGLE LOGIN AND REGISTER COMPONENT
  return (
    <Box className={classes.login_page}>
      <Box mt={5}>
        <Container maxWidth="xl">{showElement()}</Container>
      </Box>
      <CustomModal />
    </Box>
  );
};

export default Login;
