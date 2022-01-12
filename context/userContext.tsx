import React from 'react';

export const UserContext = React.createContext<{
  accessToken?: string;
  login?: (token: string) => void;
  logout?: () => void;
}>({});
