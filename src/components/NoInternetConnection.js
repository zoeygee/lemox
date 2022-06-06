import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import Iconify from './Iconify';

const NoInternetConnection = (props) => {
  // state variable holds the state of the internet connection
  const [isOnline, setOnline] = useState(true);

  // On initization set the isOnline state.
  useEffect(() => {
    setOnline(navigator.onLine);
  }, []);

  // event listeners to update the state
  window.addEventListener('online', () => {
    setOnline(true);
  });

  window.addEventListener('offline', () => {
    setOnline(false);
  });

  // if user is online, return the child component else return a custom component
  if (isOnline) {
    return props.children;
  }
  return (
    <Container>
      <Iconify icon="system-uicons:wifi-error" />
      <Typography variant="h3">Ooops!</Typography>
      <Typography>Slow or no internet connection.</Typography>
      <Typography>Please check your internet settings.</Typography>
    </Container>
  );
};

export default NoInternetConnection;
