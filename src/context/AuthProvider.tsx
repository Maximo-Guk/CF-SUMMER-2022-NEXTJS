import * as React from 'react';
import User from '../../types/User';
import { getUser, logoutUser } from '../components/requests/BackendGetRequest';

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
    const cookie = document.cookie.split('; ');
    console.log(cookie)
  });

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
