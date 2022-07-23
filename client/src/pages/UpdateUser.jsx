import React, { useState, useEffect } from 'react';
import { Box, Container, FormControl, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, toggleLoading } from '../redux/slices/elementsSlice';
import { getCurrentUser, changeUpdateUser } from '../redux/slices/userSlice';
import { CustomOutlinedInput } from '../styles/Theme.style';
import { BACKEND_URL } from '../config/keys';
import axios from 'axios';
import CustomModal from '../components/elements/CustomModal';
import Loader from '../components/elements/Loader';

export default function UpdateUser() {
  const currentUser = useSelector((state) => state.user.currentUsers);
  const isLoading = useSelector((state) => state.elements.isLoading);
  // console.log(urlParams);
  const token = localStorage.getItem('token');

  const dispatch = useDispatch();

  useEffect(() => {
    // toggleLoading();
    dispatch(getCurrentUser());
    // console.log(currentUser);
    toggleLoading();
  }, []);

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      // curl -X 'PATCH' \
      //   'http://localhost:8000/users/me' \
      //   -H 'accept: application/json' \
      //   -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiODBjYzUyNWMtMDI4Ny00YTcyLTg4ZWEtM2NhZjI2YzFmZDZjIiwiYXVkIjpbImZhc3RhcGktdXNlcnM6YXV0aCJdLCJleHAiOjE2NTg0NDExMTR9.U8w80F2FfUgK_vplVOT-Oh_G7lAc9cJzlP2ePSHh-E8' \
      //   -H 'Content-Type: application/json' \
      //   -d '{
      //   "password": "string",
      //   "email": "12user@example.com",
      //   "is_active": true,
      //   "is_superuser": true,
      //   "is_verified": true,
      //   "name": "string"
      // }'
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.patch(
        `${BACKEND_URL}/users/me`,
        currentUser,
        config
      );
      // console.log(response);
      if (
        response.status === 200 ||
        response.status ||
        201 ||
        response.status ||
        202
      ) {
        dispatch(
          openModal({
            heading: 'Congratulations',
            body: 'Updated successfully',
          })
        );
      }
    } catch (error) {
      if(error?.response?.status === 401){
        localStorage.removeItem("token");
        window.location.reload();
      }
      dispatch(
        openModal({
          heading: 'Something went wrong ',
          body: 'Please try again with correct password and email',
        })
      );
      // console.log(error);
    }
  };

  const inputChangeHandler = (e) => {
    dispatch(changeUpdateUser({ name: e.target.name, value: e.target.value }));
  };

  return (
    <Box sx={{ minHeight: '80vh' }}>
      <Container>
        <Typography variant="h2">Hi {currentUser.name}! </Typography>
        <Box component="form" onSubmit={loginHandler}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'space-between',
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <CustomOutlinedInput
              sx={{ marginRight: { xs: 0, md: 1 }, mt: 2 }}
              fullWidth
              type="text"
              name="name"
              defaultValue={currentUser.name}
              onChange={inputChangeHandler}
              required
              color="error"
              placeholder="Name"
            />
            <CustomOutlinedInput
              sx={{ marginRight: { xs: 0, md: 1 }, mt: 2 }}
              fullWidth
              type="password"
              name="password"
              onChange={inputChangeHandler}
              color="error"
              placeholder="Password"
            />
          </Box>
          <CustomOutlinedInput
            fullWidth
            type="email"
            name="email"
            color="error"
            defaultValue={currentUser.email}
            onChange={inputChangeHandler}
            placeholder="email"
          />
          <FormControl margin="dense">
            <Button variant="contained" color="error" type="submit">
              Submit
            </Button>
          </FormControl>
        </Box>
        
        {/* <Loader /> */}
      </Container>
      <CustomModal />
    </Box>
  );
}
