import React from 'react';
import Container from '@mui/material/Container';
import AppBar from '../material-ui/HomeAppBarGuest';
import PostList from '../material-ui/PostList';

// Guest view of index page
export default function Guest() {
  return (
    <>
      <AppBar />
      <Container maxWidth="xs">
        <PostList />
      </Container>
    </>
  );
}
