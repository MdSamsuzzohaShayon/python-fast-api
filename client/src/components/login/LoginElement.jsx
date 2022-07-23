import React from 'react';
import { Box, FormControl, Button, Typography } from '@mui/material';
import { CustomOutlinedInput } from '../../styles/Theme.style.js';
import { changeLoginUser } from '../../redux/slices/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../redux/slices/elementsSlice.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../../config/keys.js';

const LoginElement = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.loginableUser);

  const loginHandler = async (e) => {
    e.preventDefault();

    //         curl -X 'POST' \
    //   'http://0.0.0.0:8000/auth/jwt/login' \
    //   -H 'accept: application/json' \
    //   -H 'Content-Type: application/x-www-form-urlencoded' \
    //   -d 'grant_type=&username=test%40gmail.com&password=Test1234&scope=&client_id=&client_secret='

    if (
      userInfo.email === '' ||
      userInfo.password === '' ||
      userInfo.email === null ||
      userInfo.password === null
    ) {
      // console.log("Working - ", userInfo);
      // ERROR
      let errors = 'Errors: ';
      if (userInfo.email === '' || userInfo.email === null)
        errors += ' User email can not be empty, ';
      if (userInfo.passowrd === '' || userInfo.passowrd === null)
        errors += ' User passowrd can not be empty, ';
      dispatch(openModal({ heading: 'invalid user', body: errors }));
    } else if (userInfo.password.length < 6) {
      dispatch(
        openModal({
          heading: 'Invalid password',
          body: 'Password must be more 6 or more than 6 charecter long',
        })
      );
    } else {
      try {

        const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };
        var urlencoded = new URLSearchParams();
        urlencoded.append('grant_type', '');
        urlencoded.append('username', userInfo.email);
        urlencoded.append('password', userInfo.password);
        urlencoded.append('scope', '');
        urlencoded.append('client_id', '');
        urlencoded.append('client_secret', '');
        const response = await axios.post(`${BACKEND_URL}/auth/jwt/login`, urlencoded, config);
        console.log(response);

        if (response.status === 200) {
            localStorage.setItem('token', response.data.access_token);
            navigate('/home');
        }








      } catch (error) {
        dispatch(
          openModal({
            heading: 'Something went wrong ',
            body: 'Please try again with correct password and email',
          })
        );
        // console.log(error);
      }
    }
  };

  const inputChangeHandler = (e) => {
    // console.log(e.target.name);
    dispatch(changeLoginUser({ name: e.target.name, value: e.target.value }));
  };

  return (
    <Box onSubmit={loginHandler} component="form" noValidate autoComplete="off">
      <Typography variant="h2" mb={5} pt={5} color="error">
        {props.title}
      </Typography>
      <FormControl fullWidth margin="dense">
        <CustomOutlinedInput
          fullWidth={true}
          name="email"
          type="email"
          onChange={inputChangeHandler}
          margin="dense"
          required
          color="error"
          placeholder="Email"
          inputProps={{
            'aria-label': 'email',
          }}
        />
      </FormControl>
      <FormControl fullWidth margin="dense">
        <CustomOutlinedInput
          fullWidth={true}
          type="password"
          name="password"
          onChange={inputChangeHandler}
          margin="dense"
          required
          color="error"
          placeholder="Password"
          aria-describedby="outlined-weight-helper-text"
          inputProps={{
            'aria-label': 'password',
          }}
        />
      </FormControl>
      <FormControl margin="dense">
        <Button variant="contained" color="error" type="submit">
          Login
        </Button>
      </FormControl>
    </Box>
  );
};

export default LoginElement;
