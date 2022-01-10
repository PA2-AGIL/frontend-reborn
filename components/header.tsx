import React from 'react';
import { AdjustmentsIcon } from '@heroicons/react/solid';
import Link from 'next/link';

const Header = () => {
  const [logged] = React.useState(false);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-5">
      <div>
        <Link href="/">
          <a className="flex items-center text-white font-bold">
            <AdjustmentsIcon className="w-8  h-8 mr-2" />
            <p>AGIL</p>
          </a>
        </Link>
      </div>

      {logged ? (
        <div>
          <Link href={'#'}>
            <a className="text-teal-500 border-2 border-transparent rounded-lg hover:text-white hover:bg-transparent hover:border-white px-4 py-2 mx-2 bg-white h-5 font-bold">
              Antonio
            </a>
          </Link>
          <Link href={'#'}>
            <a className="text-teal-500 border-2 border-transparent rounded-lg hover:text-white hover:bg-transparent hover:border-white px-4 py-2 mx-2 bg-white h-5 font-bold">
              Sair
            </a>
          </Link>
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

export default Header;
