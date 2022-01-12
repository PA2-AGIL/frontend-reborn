import Head from 'next/head';
import Image from 'next/image';
import Router from 'next/router';
import React from 'react';
import { Input } from '../components/form';
import Header from '../components/header';
import { public_api } from './api/axios';

const Cadastrar = () => {
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [password2, setPassword2] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [address, setAddress] = React.useState('');

  const [errors, setErrors] = React.useState<any>({});

  const checkError = () => {
    let errs: any = {};

    if (name.length < 2 || name === '') errs.name = 'Email inválido';
    if (email.length < 2 || email === '') errs.email = 'Email inválido';
    if (password.length < 2 || password === '')
      errs.password = 'Senha inválida';
    if (password2.length < 2 || password2 === '')
      errs.password2 = 'Senha inválida';
    if (password !== password2) errs.password2 = 'Senhas diferentes';

    if (phone.length < 2 || phone === '') errs.phone = 'Telefone inválido';
    if (address.length < 2 || address === '')
      errs.address = 'Endereço inválido';

    setErrors(errs);

    return errs;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!!Object.keys(checkError()).length) {
      return;
    }

    try {
      setLoading(false);

      const { data } = await public_api.post('/auth/signup/producer', {
        name,
        email,
        password,
        phone,
        address,
      });

      console.log(data);

      Router.push('/entrar');
    } catch (error: any) {
      console.log(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Cadastrar Produtor</title>
      </Head>
      <Header />
      <div className="flex justify-around">
        <div className="w-full max-w-lg">
          <form
            className="px-8 pt-6 pb-8 mb-4 mt-10"
            onSubmit={(e: React.FormEvent) => {
              handleRegister(e);
            }}
          >
            <Input
              value={name}
              setValue={setName}
              name="Nome"
              placeholder="seu nome e sobrenome"
              error={errors.name}
            />
            <Input
              value={email}
              setValue={setEmail}
              name="Email"
              placeholder="teste@teste.com"
              error={errors.email}
            />
            <Input
              value={password}
              setValue={setPassword}
              name="Senha"
              type="password"
              placeholder="********"
              error={errors.password}
            />
            <Input
              value={password2}
              setValue={setPassword2}
              name="Confirmar Senha"
              type="password"
              placeholder="********"
              error={errors.password2}
            />
            <Input
              value={phone}
              setValue={setPhone}
              name="Telefone"
              placeholder="(84) 9.0000-0000"
              error={errors.phone}
            />
            <Input
              value={address}
              setValue={setAddress}
              name="Endereço"
              placeholder="rua dos tolos numero 0"
              error={errors.address}
            />

            <div className="flex items-center justify-between">
              <button
                className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Cadastrar
              </button>
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

export default Cadastrar;
