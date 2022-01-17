import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import React from 'react';
import { Input } from '../components/form';
import Header from '../components/header';
import { UserContext } from '../context/userContext';
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

  const { accessToken, logout } = React.useContext(UserContext);

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
    <div className="w-full h-screen bg-primary-lighteen">
      <Head>
        <title>Cadastrar Produtor</title>
      </Head>
      <div className="container mx-auto">
        <div className="flex justify-around">
          <div className="w-full max-w-3xl">
            <Link href={accessToken ? '/perguntas' : '/'}>
              <a className="flex items-center text-black my-5">
                <h2 className="text-4xl">Ágil</h2>
                <Image
                  src="/leaf.svg"
                  width={50}
                  height={50}
                  objectFit="contain"
                />
              </a>
            </Link>
            <h2 className="text-black text-3xl my-8">Cadastro</h2>
            <form
              className=""
              onSubmit={(e: React.FormEvent) => {
                handleRegister(e);
              }}
            >
              <Input
                value={name}
                setValue={setName}
                name="Nome"
                placeholder="Nome completo"
                error={errors.name}
                color='black'
              />
              <Input
                value={email}
                setValue={setEmail}
                name="Email"
                placeholder="Exemplo: exemplo@email.com"
                error={errors.email}
                color='black'
              />
              <Input
                value={password}
                setValue={setPassword}
                name="Senha"
                type="password"
                placeholder="Sua senha"
                error={errors.password}
                color='black'
              />
              <Input
                value={password2}
                setValue={setPassword2}
                name="Confirmar Senha"
                type="password"
                placeholder="Repita sua senha"
                error={errors.password2}
                color='black'
              />
              <Input
                value={phone}
                setValue={setPhone}
                name="Telefone"
                placeholder="(84) 9.0000-0000"
                error={errors.phone}
                color='black'
              />
              <Input
                value={address}
                setValue={setAddress}
                name="Endereço"
                placeholder="Exemplo: Avenida Brasil, Número 15"
                error={errors.address}
                color='black'
              />

              <div className="flex justify-end items-end flex-col">
                <button
                  className="bg-secondary hover:bg-secondary-dark w-52 text-white text-lg font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Cadastrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cadastrar;
