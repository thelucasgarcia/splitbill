import React, { useState } from 'react';
import { useStorageState } from './useStorageState';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { decode } from "base-64";
global.atob = decode;

interface AuthTokens {
  access_token: string,
  refresh_token?: string | null
}

interface AuthContextProps { 
  signIn: (paylaod: AuthTokens) => void
  signOut: () => void
  session?: string | null
  isLoading: boolean,
  user: AuthUser | null
  tokens?: AuthTokens | null
}

const AuthContext = React.createContext<AuthContextProps>({} as AuthContextProps)


// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

interface AuthUser extends JwtPayload{
  sub: string,
  email: string,
  name: string,
  username: string,
  iat: number
  exp: number
}

function decodeUser(token?: string | null) {
  if (!token) return null
  try {
    return jwtDecode<AuthUser>(token)
  } catch (error) {
    return null
  }
}

export const getTokens = () => {
  const [[_, session]] = useStorageState('access_token');
  const [[__, refreshtoken]] = useStorageState('refresh_token');
  const tokens = session ? {
    access_token: session,
    refresh_token: refreshtoken
  } : null
  

  return tokens
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('access_token');
  const [[isLoadingUser, refreshtoken], setRefreshToken] = useStorageState('refresh_token');

  function signIn(payload: AuthTokens) {
    setSession(payload.access_token);    
    if (payload.refresh_token) {
      setRefreshToken(payload.refresh_token)
    }
  }

  function signOut() {
    setSession(null);
    setRefreshToken(null);
  }

 
  const user = decodeUser(session)

  const tokens = session ? {
    access_token: session,
    refresh_token: refreshtoken
  } : null

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session,
        isLoading,
        user,
        tokens
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
