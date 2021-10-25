import * as React from 'react';
import { AuthContext } from '../src/context/AuthProvider';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LoginForm from '../src/material-ui/LoginForm';

export default function Login() {
  const { login } = React.useContext(AuthContext);
  const [buttonClicked, setButtonClicked] = React.useState(false);
  const [loginError, setLoginError] = React.useState('');
  const [userNameText, setUserNameText] = React.useState('');

  async function handleLogin() {
    await login(userNameText);
    setLoginError('Username is taken!');
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
