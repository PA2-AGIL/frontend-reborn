import React from 'react';

export const UserContext = React.createContext<{
  accessToken?: string;
  type?: string;
  login?: (token: string) => void;
  logout?: () => void;
}>({});
