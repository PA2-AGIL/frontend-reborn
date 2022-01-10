import { BadgeCheckIcon } from '@heroicons/react/solid';
import Head from 'next/head';
import React from 'react';
import { Input } from '../components/form';
import Header from '../components/header';

const Esqueci = () => {
  const [email, setEmail] = React.useState('');

  const [errors, setErrors] = React.useState<any>({});

  const checkError = () => {
    let errs: any = {};

    if (email.length < 2 || email === '') errs.email = 'Email inválido';

    setErrors(errs);
  };
  return (
    <>
      <Head>
        <title>Esqueci a senha</title>
      </Head>
      <Header />
      <div className="flex justify-around">
        <div className="w-full max-w-lg">
          {false ? (
            <div className="px-8 pt-6 pb-8 mb-4 text-teal-500 flex flex-col items-center justify-center h-96  text-center">
              <BadgeCheckIcon className="w-20 mb-4" />
              <h1 className="font-bold">Tudo certo! Cheque seu email!</h1>
            </div>
          ) : (
            <form className="px-8 pt-6 pb-8 mb-4">
              <Input
                name="Email"
                placeholder="teste@teste.com"
                value={email}
                setValue={setEmail}
                error={errors.email}
              />

              <div className="flex items-center justify-between">
                <button
                  className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => checkError()}
                >
                  Enviar
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Esqueci;
