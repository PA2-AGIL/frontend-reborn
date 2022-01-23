import React from 'react';
import { AdjustmentsIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { UserContext } from '../context/userContext';

const Header = () => {
  const { accessToken, logout } = React.useContext(UserContext);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-5">
      <div>
        <Link href={accessToken ? '/perguntas' : '/'}>
          <a className="flex items-center text-white font-bold">
            <AdjustmentsIcon className="w-8  h-8 mr-2" />
            <p>AGIL</p>
          </a>
        </Link>
      </div>

      {accessToken ? (
        <div>
          <Link href={'#'}>
            <a className="border-2 border-transparent rounded-lg text-white bg-transparent hover:border-white px-4 py-2 mx-2 bg-white h-5 font-bold">
              {parseJwt(accessToken).name}
            </a>
          </Link>
          <span
            className="text-teal-500 border-2 border-transparent rounded-lg hover:text-white hover:bg-transparent hover:border-white px-4 py-2 mx-2 bg-white h-5 font-bold hover:cursor-pointer"
            onClick={() => logout!()}
          >
            Sair
          </span>
        </div>
      ) : (
        <div>
          <Link href={'/entrar'}>
            <a className="text-teal-500 border-2 border-transparent rounded-lg hover:text-white hover:bg-transparent hover:border-white px-4 py-2 mx-2 bg-white h-5 font-bold">
              Entrar
            </a>
          </Link>
          <Link href={'/cadastrar'}>
            <a className="text-teal-500 border-2 border-transparent rounded-lg hover:text-white hover:bg-transparent hover:border-white px-4 py-2 mx-2 bg-white h-5 font-bold">
              Registrar
            </a>
          </Link>
        </div>
      )}
    </nav>
  );
};

export const parseJwt = (token: string) => {
  if (!token) {
    return;
  }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
};

export default Header;
