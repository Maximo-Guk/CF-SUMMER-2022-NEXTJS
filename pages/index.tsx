import * as React from 'react';
import { AuthContext } from '../src/context/AuthProvider';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Guest from '../src/components/Guest';
import LoggedIn from '../src/components/LoggedIn';

// entry point to our social app!
// contains logic for displaying guest and loggedIn components
export default function Index() {
  const { loading, user } = React.useContext(AuthContext);

  return (
    <>
      {!loading ? (
        user.userName ? (
          <LoggedIn />
        ) : (
          <Guest />
        )
      ) : (
        <Container
          sx={{
            flex: 1,
            height: 600,
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <CircularProgress />
        </Container>
      )}
      ;
    </>
  );
}
