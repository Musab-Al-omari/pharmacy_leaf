import React, { useState, createContext, useContext } from 'react';
import cookie from 'react-cookies';

const AuthContext = createContext(undefined);

function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => cookie.load('token') || null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error();
  }

  return context;
}

export default AuthProvider;
