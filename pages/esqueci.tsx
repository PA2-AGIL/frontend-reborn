import { BadgeCheckIcon } from '@heroicons/react/solid';
import Head from 'next/head';
import React from 'react';
import { Input } from '../components/form';
import Header from '../components/header';
import { public_api } from './api/axios';

const Esqueci = () => {
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [ok, setOk] = React.useState(false);

  const [errors, setErrors] = React.useState<any>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!!Object.keys(checkError()).length) {
      return;
    }
    try {
      setLoading(true);
      await public_api.post(`/forgot-password/forgot`, { email });
      setOk(true);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const checkError = () => {
    let errs: any = {};

    if (email.length < 2 || email === '') errs.email = 'Email inválido';

    setErrors(errs);

    return errs;
  };
  return (
    <>
      <Head>
        <title>Esqueci a senha</title>
      </Head>
      <Header />
      <div className="flex justify-around">
        <div className="w-full max-w-lg">
          {ok ? (
            <div className="px-8 pt-6 pb-8 mb-4 text-teal-500 flex flex-col items-center justify-center h-96  text-center">
              <BadgeCheckIcon className="w-20 mb-4" />
              <h1 className="font-bold">Tudo certo! Cheque seu email!</h1>
            </div>
          ) : (
            <form
              className="px-8 pt-6 pb-8 mb-4"
              onSubmit={(e: React.FormEvent) => handleSubmit(e)}
            >
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
                  type="submit"
                  disabled={loading}
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
