import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Container, FormControl, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { openModal } from '../redux/slices/elementsSlice';
import { CustomOutlinedInput } from '../styles/Theme.style';
import { BACKEND_URL } from '../config/keys';
import axios from 'axios';
import CustomModal from '../components/elements/CustomModal';

export default function ResetPassword() {
  const navigate = useNavigate();
  const urlParams = useParams();
  // console.log(urlParams);

  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState(null);
  const [newPassword2, setNewPassword2] = useState(null);


  const loginHandler = async (e) => {
    e.preventDefault();

    if (
      newPassword === '' ||
      newPassword === null ||
      urlParams.roken === '' ||
      urlParams.roken === null ||
      newPassword !== newPassword2
    ) {
      let errors = 'Errors: ';
      if (newPassword === '' || newPassword === null)
        errors += ' Password can not be empty, ';
      if (newPassword !== newPassword2) {
        errors += ' Password did not match ';
      }
      dispatch(openModal({ heading: 'invalid inputs', body: errors }));
    } else {
      try {
        const config = {
          headers: { 'Content-Type': 'application/json' },
        };
        const response = await axios.post(
          `${BACKEND_URL}/auth/reset-password`,
          { password: newPassword, token: urlParams.token },
          config
        );
        // console.log(response);
        if(response.status === 200 || response.status || 201 || response.status || 202){
          navigate('/login');
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

  return (
    <Box sx={{ minHeight: '80vh' }}>
      <Container>
        <Box component="form" onSubmit={loginHandler}>
          <FormControl fullWidth margin="dense">
            <CustomOutlinedInput
              fullWidth={true}
              type="password"
              name="password"
              onChange={(e) => setNewPassword(e.target.value)}
              margin="dense"
              required
              color="error"
              placeholder="New Password"
              aria-describedby="outlined-weight-helper-text"
            />
          </FormControl>
          <FormControl fullWidth margin="dense">
            <CustomOutlinedInput
              fullWidth={true}
              type="password"
              name="password2"
              onChange={(e) => setNewPassword2(e.target.value)}
              margin="dense"
              required
              color="error"
              placeholder="Confirm password"
              aria-describedby="outlined-weight-helper-text"
            />
          </FormControl>
          <FormControl margin="dense">
            <Button variant="contained" color="error" type="submit">
              Submit
            </Button>
          </FormControl>
        </Box>
      </Container>
      <CustomModal />
    </Box>
  );
}
