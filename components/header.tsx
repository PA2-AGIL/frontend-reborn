import React from 'react';
import { AdjustmentsIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { UserContext } from '../context/userContext';

const Header = () => {
  const { accessToken, logout } = React.useContext(UserContext);

  return (
    <nav className="flex items-center justify-between flex-wrap p-5 mx-10">
      <div>
        <Link href={accessToken ? '/perguntas' : '/'}>
          <a className="flex items-center text-black font-bold">
            <h2 className="text-4xl" >Ágil </h2>
            <svg width="38" height="32" viewBox="0 0 38 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 30.5C10 34.5 10.5 6.49999 29.5 7.99997" stroke="black" stroke-width="1.75" stroke-linecap="round"/>
              <path d="M4 27C7.5 23.5 4 15.5 10.5 8.00004C17 0.500049 39 1.00005 36 3.00005C33 5.00004 34.5 18.5 23.5 25C12.5 31.5 14 24 10.5 27" stroke="black" stroke-width="1.75" stroke-linecap="round"/>
            </svg>
          </a>
        </Link>
      </div>

      {accessToken ? (
        <div>
          <Link href={'#'}>
            <a className="border-2 border-transparent rounded-lg text-white bg-transparent hover:border-white px-4 py-2 mx-2 bg-white h-5 font-bold">
              {parseJwt(accessToken).email}
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
            <button className="text-gray rounded-lg px-4 py-1 mx-2 bg-transparent font-light text-2xl hover:font-medium">
              Entrar
            </button>
          </Link>
          <Link href={'/cadastrar'}>
            <button className="text-white rounded-lg px-3 py-1 mx-2 bg-gray font-medium text-xl hover:text-white hover:bg-transparent hover:border-white">
              Registrar
            </button>
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
