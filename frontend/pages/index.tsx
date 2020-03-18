import { Box, Typography, Container } from '@material-ui/core';

function HomePage() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1">
          Hello world from Next.js and Material UI
        </Typography>
      </Box>
    </Container>
  )
}

export default HomePage;
