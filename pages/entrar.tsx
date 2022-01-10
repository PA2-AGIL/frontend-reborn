import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import { Input } from '../components/form';
import Header from '../components/header';

const Entrar = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [errors, setErrors] = React.useState<any>({});

  const checkError = () => {
    let errs: any = {};

    if (email.length < 2 || email === '') errs.email = 'Email inválido';
    if (password.length < 2 || password === '')
      errs.password = 'Senha inválida';

    setErrors(errs);
  };

  return (
    <>
      <Head>
        <title>Entrar</title>
      </Head>
      <Header />
      <div className="flex justify-around">
        <div className="w-full max-w-lg">
          <form className="px-8 pt-6 pb-8 mb-4 mt-10">
            <Input
              name="Email"
              placeholder="teste@teste.com"
              value={email}
              setValue={setEmail}
              error={errors.email}
            />
            <Input
              name="Senha"
              type="password"
              placeholder="********"
              value={password}
              setValue={setPassword}
              error={errors.password}
            />

            <div className="flex items-center justify-between">
              <button
                className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => checkError()}
              >
                Entrar
              </button>
              <a
                className="inline-block align-baseline font-bold text-sm text-teal-500 hover:text-teal-600"
                href="#"
              >
                Esqueceu a senha?
              </a>
            </div>
          </form>
        </div>
        <div className="w-full max-w-lg hidden md:block">
          <Image
            src="/register.svg"
            width="100%"
            height="100%"
            layout="responsive"
            objectFit="contain"
          />
        </div>
      </div>
    </>
  );
};

export default Entrar;
