import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import { UserContext } from '../context/userContext';
import { parseJwt } from '../components/header';

function MyApp({ Component, pageProps }: AppProps) {
  const [accessToken, setAccessToken] = React.useState('');
  const [type, setType] = React.useState('');
  const [refresh, setRefresh] = React.useState(false);

  const login = (token: string) => {
    setAccessToken(token);
    setRefresh(!refresh);
  };

  const logout = () => {
    localStorage.clear();
    setAccessToken('');
    setRefresh(!refresh);
  };

  React.useEffect(() => {
    const user = localStorage.getItem('accessToken');
    if (user) {
      setAccessToken(user);
      setType(parseJwt(user).type);
    }
  }, [refresh]);

  return (
    <UserContext.Provider value={{ accessToken, type, login, logout }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
