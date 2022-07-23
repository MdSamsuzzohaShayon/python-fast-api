import axios from 'axios';
import { BACKEND_URL } from '../../config/keys.js';
import CustomModal from '../elements/CustomModal';

// MATERIAL UI
import { Box, Typography, FormControl, Button } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { CustomOutlinedInput } from '../../styles/Theme.style.js';


// REDUX
import { useDispatch } from 'react-redux';
import {
  changeRagisterUser,
} from '../../redux/slices/userSlice.js';
import { useSelector } from 'react-redux';
import { openModal } from '../../redux/slices/elementsSlice.js';


function Register(props) {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.registerableUser);

  // CREATE NEW USER
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a request to register
      // "email": "mdshayon0@gmail.com",
      // "password": "Test1234",
      // "is_active": true,
      // "is_superuser": false,
      // "is_verified": false

      if(userInfo.password !== userInfo.password2){
        // console.log(userInfo);
        dispatch(openModal({ heading: 'Password did not match', body: `${userInfo.password} is not ${userInfo.password2}` }));
        return;
      }
      
      const newUser = Object.assign({}, userInfo);
      const config = {headers: {"Content-Type": "application/json"}};
      newUser.is_verified = false;
      newUser.is_active = true;
      newUser.is_superuser = true;
      // delete newUser.name;
      // console.log(newUser);
      const response = await axios.post(`${BACKEND_URL}/auth/register`, newUser, config);
      if (response.status === 200 || response.status === 201){
        // console.log(response);
        window.location.reload();
      }
      

    } catch (error) {
      if(error?.response?.status === 400){
        return dispatch(
          openModal({ heading: 'Register Incomplete', body: "User is been registred already" })
        );        
      }
      dispatch(
        openModal({ heading: 'Register Incomplete', body: error.message })
      );
    }

  };

  const inputChangeHandler = (e) => {
    dispatch(
      changeRagisterUser({ name: e.target.name, value: e.target.value })
    );
  };

  return (
    <Box
      component="form"
      sx={{ backgroundColor: '#24242a' }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h2" mb={5} pt={5} color="error">
        {props.title}
      </Typography>
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
          onChange={inputChangeHandler}
          required
          color="error"
          placeholder="Name"
        />
        <CustomOutlinedInput
          sx={{ marginLeft: { xs: 0, md: 1 }, mt: 2 }}
          fullWidth
          type="email"
          name="email"
          required
          color="error"
          onChange={inputChangeHandler}
          placeholder="email"
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          marginBottom: 2,
          alignItems: 'space-between',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <CustomOutlinedInput
          sx={{ marginRight: { xs: 0, md: 1 }, mt: 2 }}
          fullWidth
          type="password"
          name="password"
          onChange={inputChangeHandler}
          required
          color="error"
          placeholder="Password"
        />
        <CustomOutlinedInput
          sx={{ marginLeft: { xs: 0, md: 1 }, mt: 2 }}
          fullWidth
          type="password"
          name="password2"
          onChange={inputChangeHandler}
          required
          color="error"
          placeholder="Confirm Password"
        />
      </Box>


      <FormControl
        margin="dense"
        justify="center"
        align="center"
        fullWidth={true}
      >
        <Box textAlign="center" my={5}>
          <Button
            variant="contained"
            color="error"
            type="submit"
            endIcon={<ArrowForward />}
            sx={{ textTransform: 'capitalize' }}
          >
            Register
          </Button>
        </Box>
      </FormControl>
      <CustomModal />
    </Box>
  );
}

export default Register;
