import React from 'react';
import Container from '@mui/material/Container';
import AppBar from '../material-ui/HomeAppBarLoggedIn';
import PostList from '../material-ui/PostList';

// Logged in view of index page
export default function LoggedIn() {
  return (
    <>
      <AppBar />
      <Container maxWidth="xs">
        <PostList />
      </Container>
    </>
  );
}
