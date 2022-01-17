import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import router from 'next/router';
import React from 'react';
import { Input, Toggle } from '../components/form';
import Header from '../components/header';
import { UserContext } from '../context/userContext';
import { public_api } from './api/axios';

const Entrar = () => {
  const { login } = React.useContext(UserContext);
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState<any>({});
  const [expert, setExpert] = React.useState(false);

  const checkError = () => {
    let errs: any = {};

    if (email.length < 2 || email === '') errs.email = 'Email inválido';
    if (password.length < 2 || password === '')
      errs.password = 'Senha inválida';

    setErrors(errs);

    return errs;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!!Object.keys(checkError()).length) {
      return;
    }
    try {
      setLoading(true);

      const { data } = await public_api.post(
        `/auth/signin/${expert ? 'expert' : 'producer'}`,
        {
          email,
          password,
        }
      );
      const { accessToken } = data;

      localStorage.setItem('accessToken', accessToken);
      login!(accessToken);
      router.push('/perguntas');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Entrar</title>
      </Head>
      <Header />
      <div className="flex justify-around">
        <div className="w-full max-w-lg">
          <form
            className="px-8 pt-6 pb-8 mb-4 mt-10"
            onSubmit={(e: React.FormEvent) => {
              handleLogin(e);
            }}
          >
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

            <div className="flex items-end justify-end">
              <Link href="/esqueci">
                <a className="inline-block align-baseline font-bold text-sm text-teal-500 hover:text-teal-600 mb-5">
                  Esqueceu a senha?
                </a>
              </Link>
            </div>

            <div className="flex items-center justify-between">
              <button
                className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Entrar
              </button>
              <Toggle
                id="expertToggle"
                value={expert}
                setValue={setExpert}
                name="Especialista"
              />
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
