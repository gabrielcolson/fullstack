import { Box, Typography, Container } from '@material-ui/core';
import React from 'react';

import Layout from '../components/Layout';

function HomePage() {
  return (
    <Layout>
      <Container maxWidth="md">
        <Box my={4}>
          <Typography variant="h4" component="h1" align="center">
            Hello world from Next.js and Material UI
          </Typography>
        </Box>
      </Container>
    </Layout>
  );
}

export default HomePage;
