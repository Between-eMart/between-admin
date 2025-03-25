import React, { createContext, useState } from 'react';
import { AuthSeekApi } from '~/apis';

export interface AuthContextType {
  username: string | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  //
  const [username, setUsername] = useState<string | null>(sessionStorage.getItem('username'));

  const login = async (_username: string, _password: string) => {
    //
    const response = await AuthSeekApi.signIn({ username: _username, password: _password });
    const result = response.result;
    if (result) {
      setUsername(result.username);
      sessionStorage.setItem('username', result.username);
      sessionStorage.setItem('access_token', result.token);
    } else {
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('access_token');
    }
  };

  const logout = () => {
    //
    setUsername(null);
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('access_token');
  };

  return (
    <AuthContext.Provider value={{ username, login, logout }}>{children}</AuthContext.Provider>
  );
};
