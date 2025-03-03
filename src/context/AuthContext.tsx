import React, { createContext, useState } from 'react';

export interface AuthContextType {
  user: string | null;
  login: (user: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  //
  const [user, setUser] = useState<string | null>(sessionStorage.getItem('user'));

  const login = (_user: string) => {
    //
    setUser(_user);
    sessionStorage.setItem('user', _user);
  };

  const logout = () => {
    //
    setUser(null);
    sessionStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
  );
};
