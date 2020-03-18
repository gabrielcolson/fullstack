import { Box, Typography, Container, Button } from '@material-ui/core';
import React from 'react';
import { useColorScheme } from '../utils/colorScheme';

function HomePage() {
  const [colorScheme, toggleColorScheme] = useColorScheme();

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1">
          Hello world from Next.js and Material UI
        </Typography>
        <Button variant="outlined" onClick={toggleColorScheme}>Current theme: {colorScheme}</Button>
      </Box>
    </Container>
  )
}

export default HomePage;
