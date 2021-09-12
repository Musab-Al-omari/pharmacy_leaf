import React, { useState, createContext, useContext } from 'react';

const AuthContext = createContext(undefined);

function AuthProvider({ children }) {
  const [auth, setAuth] = useState(undefined);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context == undefined) {
    throw new Error();
  }

  return context;
}

export default AuthProvider;
