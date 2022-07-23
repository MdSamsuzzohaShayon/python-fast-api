import React, { useState } from 'react';
import { Box, FormControl, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/slices/elementsSlice';
import { CustomOutlinedInput } from '../../styles/Theme.style';
import { BACKEND_URL } from '../../config/keys';
import axios from 'axios';

function RefactorPassword() {
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState(null);
  const loginHandler = async (e) => {
    e.preventDefault();

    if (userEmail === '' || userEmail === null) {
      let errors = 'Errors: ';
      if (userEmail === '' || userEmail === null)
        errors += ' User email can not be empty, ';
      dispatch(openModal({ heading: 'invalid user', body: errors }));
    } else {
      try {
        const config = {
          headers: { 'Content-Type': 'application/json' },
        };
        const response = await axios.post(
          `${BACKEND_URL}/auth/forgot-password`,
          { email: userEmail },
          config
        );
        console.log(response);
        if(response.status === 200 || response.status === 201 || response.status === 202){
          dispatch(
            openModal({
              heading: 'Successfull request',
              body: 'A reset password URL is been sent to your email please click on that to proceed your password changing process.',
            })
          );
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
    <Box sx={{minHeight: '60vh'}}>
      <Box component="form"  onSubmit={loginHandler}>
          <FormControl fullWidth margin="dense">
            <CustomOutlinedInput
              fullWidth={true}
              name="email"
              type="email"
              onChange={(e) => setUserEmail(e.target.value)}
              margin="dense"
              required
              color="error"
              placeholder="Email"
              inputProps={{
                'aria-label': 'email',
              }}
            />
          </FormControl>
          <FormControl margin="dense">
            <Button variant="contained" color="error" type="submit">
              Submit
            </Button>
          </FormControl>
        </Box>
        {/* <Link to="/login" style={{color: 'white', textDecoration: "none"}}>Remember Password?</Link> */}
    </Box>
  )
}

export default RefactorPassword