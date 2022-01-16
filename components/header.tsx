import React from 'react';
import { AdjustmentsIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { UserContext } from '../context/userContext';
import Image from 'next/image';

const Header = () => {
  const { accessToken, logout } = React.useContext(UserContext);

  return (
    <nav className="flex items-center justify-between flex-wrap p-5 mx-10">
      <div>
        <Link href={accessToken ? '/perguntas' : '/'}>
          <a className="flex items-center text-black font-bold">
            <h2 className="text-4xl" >Ágil </h2>
            <Image
              src="/leaf.svg"
              width={50}
              height={50}
              objectFit="contain"
            />
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
