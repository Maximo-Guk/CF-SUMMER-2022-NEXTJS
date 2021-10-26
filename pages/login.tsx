import * as React from 'react';
import { AuthContext } from '../src/context/AuthProvider';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LoginForm from '../src/material-ui/LoginForm';

export default function Login() {
  const { login, verificationPush } = React.useContext(AuthContext);
  const [buttonClicked, setButtonClicked] = React.useState(false);
  const [loginErrorUser, setLoginErrorUser] = React.useState('');
  const [loginError, setLoginError] = React.useState('');
  const [userNameText, setUserNameText] = React.useState('');

  async function handleLogin() {
    // Due to issues with KV workers responses being slow to update, user may get login errors
    // on verification attempt due to user record not being created in database, causing an error
    // when this happens, if user sends another request userName may be "taken" due to database suddenly having the record.
    // In order to mitigate this error, when server error occurs, save the username in state.
    // If server responds with user's details on subsequent request, user is considered logged in and pushed to home page.
    try {
      await login(userNameText);
      if (userNameText === loginErrorUser) {
        verificationPush();
      } else {
        setLoginError('Username is taken!');
      }
    } catch (error) {
      setLoginError('A server error occured, please try again.');
      setLoginErrorUser(userNameText);
    }
  }

  return (
    <Container
      sx={{
        flex: 1,
        height: 600,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {!buttonClicked ? (
        <Button variant="contained" onClick={() => setButtonClicked(true)}>
          Log in
        </Button>
      ) : (
        <>
          <LoginForm userNameText={userNameText} setUserNameText={setUserNameText} />
          <Typography color="red">{loginError}</Typography>
          <Button variant="contained" onClick={() => handleLogin()}>
            Submit
          </Button>
        </>
      )}
    </Container>
  );
}
