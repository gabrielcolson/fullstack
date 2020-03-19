import { Box, Typography, Container, Button } from '@material-ui/core';
import React from 'react';

import Layout from '../components/Layout';
import { useColorScheme } from '../utils/colorScheme';

function HomePage() {
  const [, toggleColorScheme] = useColorScheme();

  return (
    <Layout>
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1">
            Hello world from Next.js and Material UI
          </Typography>
          <Button variant="contained" color="primary" onClick={toggleColorScheme}>Toggle theme</Button>
        </Box>
      </Container>
    </Layout>
  )
}

export default HomePage;
