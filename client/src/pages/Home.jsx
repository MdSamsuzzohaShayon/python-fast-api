import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Box, Container, Typography, } from '@mui/material';
import {BACKEND_URL} from '../config/keys';


function Home() {
  const token = localStorage.getItem('token');
  const [message, setMessage] = useState(null);
  // console.log(window.innerWidth);
  const protectedRoute=async()=>{
    try {      
      //   curl -X 'GET' \
      // 'http://0.0.0.0:8000/authenticated-route' \
      // -H 'accept: application/json' \
      // -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiOGUwNWRiNzYtYTMzMC00YTgyLTkwMGMtMGRlNWJkNTk1N2MxIiwiYXVkIjpbImZhc3RhcGktdXNlcnM6YXV0aCJdLCJleHAiOjE2NTgzMTkxMTZ9.yt715qdfcvRqHOd2wt-2JX5c1njBWebBOgVoYg0qKcQ'
      const config = {headers: {"Authorization": `Bearer ${token}`}};
      const response = await axios.get(`${BACKEND_URL}/authenticated-route`, config);
      setMessage(response.data.message);
    } catch (error) {
      console.log(error);
      if(error?.response?.status === 400 || error?.response?.status === 401){
        localStorage.removeItem('token');
        window.location.reload();
      }
    }
  }

  useEffect(()=>{
    protectedRoute();
  }, []);
  return (
    <Box className="Home">
      <Container maxWidth="sm">
        <Typography variant='h2'>Homepage</Typography>
        <br /><br /><br /><br /><br />
        <Typography variant="h4">{message}</Typography>
      </Container>
    </Box>
  );
}

export default Home;
