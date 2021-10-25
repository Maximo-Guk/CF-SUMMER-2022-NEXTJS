import * as React from 'react';
import { AuthContext } from '../src/context/AuthProvider';
import Guest from '../src/components/Guest';
import LoggedIn from '../src/components/LoggedIn';

export default function Index() {
  const { user } = React.useContext(AuthContext);

  return <>{user.userName ? <LoggedIn /> : <Guest />};</>;
}
