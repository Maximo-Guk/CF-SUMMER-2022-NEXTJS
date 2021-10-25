import * as React from 'react';
import User from '../../types/User';
import {
  getUser,
  logoutUser,
  verifyUser,
} from '../components/requests/BackendGetRequest';

interface AuthContextTypes {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  login: (userName: string) => Promise<User>;
  logout: () => Promise<void>;
}
interface AuthProviderTypes {
  children: React.ReactNode;
}

export const AuthContext = React.createContext<AuthContextTypes>({} as AuthContextTypes);

export default function AuthProvider({ children }: AuthProviderTypes) {
  React.useEffect(() => {
    //verification();
  });

  async function verification() {
    if (document.cookie) {
      try {
        const response = await verifyUser();
        setUser(response);
      } catch (error) {
        await logoutUser();
      }
    }
  }

  const [user, setUser] = React.useState<User>({} as User);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: (userName) => {
          return getUser(userName);
        },
        logout: () => {
          return logoutUser();
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
