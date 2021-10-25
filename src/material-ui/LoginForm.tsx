import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';

interface propsTypes {
  userNameText: string;
  setUserNameText: React.Dispatch<React.SetStateAction<string>>;
}

export default function LoginForm(props: propsTypes) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 1 }}>
      <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
      <TextField
        id="username"
        label="Username"
        variant="standard"
        value={props.userNameText}
        onChange={(event) => props.setUserNameText(event.target.value)}
      />
    </Box>
  );
}
