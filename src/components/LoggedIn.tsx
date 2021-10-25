import * as React from 'react';
import { Box, Container, Link, Typography } from '@mui/material';
import AppBar from '../material-ui/HomeAppBarLoggedIn';

export default function LoggedIn() {
  return (
    <>
      <AppBar />
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Next.js v5-beta with TypeScript example
          </Typography>
          <Link href="/d" color="secondary">
            Go to the about page
          </Link>
        </Box>
      </Container>
    </>
  );
}
