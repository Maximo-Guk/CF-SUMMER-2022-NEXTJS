import * as React from 'react';
import { Container } from '@mui/material';
import AppBar from '../material-ui/HomeAppBarGuest';
import PostList from '../material-ui/PostList';

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
