import * as React from 'react';
import Router from 'next/router';
import User from '../../types/User';
import {
  getUser,
  logoutUser,
  verifyUser,
} from '../components/requests/BackendGetRequest';

interface AuthContextTypes {
  verificationPush(): Promise<void>;
  loading: boolean;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  login: (userName: string) => Promise<void | User>;
  logout: () => Promise<void>;
}
interface AuthProviderTypes {
  children: React.ReactNode;
}

export const AuthContext = React.createContext<AuthContextTypes>({} as AuthContextTypes);

// Auth provider wrapper contains logic for verification of JWT tokens
// the main user and it's login, logout methods and other utility methods
export default function AuthProvider({ children }: AuthProviderTypes) {
  const [loading, setLoading] = React.useState(true);

  // verify user's JWT token on refresh of page
  React.useEffect(() => {
    setLoading(true);
    verification();
  }, []);

  // verify token by contacting verify endpoint on CF worker
  // proceed to then getUser with this decoded userName from token and then populate user with it's retrieved attributes
  async function verification() {
    try {
      const responseVerify = await verifyUser();
      const response = await getUser(responseVerify.userName);
      setUser(response);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  // verify token by contacting verify endpoint on CF worker
  // proceed to then getUser with this decoded userName from token and then populate user with it's retrieved attributes
  // then push the route back to homepage (very similar to verification method)
  async function verificationPush() {
    const responseVerify = await verifyUser();
    const response = await getUser(responseVerify.userName);
    setUser(response);
    Router.push('/');
  }

  const [user, setUser] = React.useState<User>({} as User);

  return (
    <AuthContext.Provider
      value={{
        verificationPush,
        loading,
        user,
        setUser,
        login: async (userName) => {
          // log user in, by contacting login endpoint and running verificationPush()
          // in order to verify JWT token obtained
          return await getUser(userName).catch(() => verificationPush());
        },
        logout: async () => {
          // log user out, by contacting logout endpoint and setting main user to empty object
          return await logoutUser().catch(() => setUser({} as User));
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
