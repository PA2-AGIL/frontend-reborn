import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import { UserContext } from '../context/userContext';

function MyApp({ Component, pageProps }: AppProps) {
  const [accessToken, setAccessToken] = React.useState('');

  const login = (token: string) => {
    setAccessToken(token);
  };

  const logout = () => {
    localStorage.clear();
    setAccessToken('');
  };

  React.useEffect(() => {
    const user = localStorage.getItem('accessToken');
    if (user) {
      setAccessToken(user);
    }
  }, []);

  return (
    <UserContext.Provider value={{ accessToken, login, logout }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
