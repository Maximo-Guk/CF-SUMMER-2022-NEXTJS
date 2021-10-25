import * as React from 'react';
import Router from 'next/router';
import User from '../../types/User';
import {
  getUser,
  logoutUser,
  verifyUser,
} from '../components/requests/BackendGetRequest';

interface AuthContextTypes {
  verificationNoLogout(): Promise<void>;
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

export default function AuthProvider({ children }: AuthProviderTypes) {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    verification();
  }, []);

  async function verification() {
    if (document.cookie) {
      try {
        const responseVerify = await verifyUser();
        const response = await getUser(responseVerify.userName);
        setUser(response);
      } catch (error) {
        await logoutUser();
      }
    }
    setLoading(false);
  }

  async function verificationNoLogout() {
    if (document.cookie) {
      const responseVerify = await verifyUser();
      const response = await getUser(responseVerify.userName);
      setUser(response);
      Router.push('/');
    }
  }

  const [user, setUser] = React.useState<User>({} as User);

  return (
    <AuthContext.Provider
      value={{
        verificationNoLogout,
        loading,
        user,
        setUser,
        login: async (userName) => {
          return await getUser(userName).catch(() => verificationNoLogout());
        },
        logout: async () => {
          return await logoutUser().catch(() => setUser({} as User));
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
