import Head from 'next/head';
import Image from 'next/image';
import Router from 'next/router';
import React from 'react';
import { Input, Toggle } from '../components/form';
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
  const [type, setType] = React.useState('AQUICULTOR');
  const [expert, setExpert] = React.useState(false);

  const [apiError, setApiError] = React.useState('');

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
      setApiError('');

      if (expert) {
        await public_api.post('/auth/signup/expert', {
          name,
          email,
          password,
          phone,
          address,
          type,
        });
      } else {
        await public_api.post('/auth/signup/producer', {
          name,
          email,
          password,
          phone,
          address,
        });
      }
      Router.push('/entrar');
    } catch (error: any) {
      console.log(error);
      setApiError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Cadastrar {expert ? 'Especialista' : 'Produtor'}</title>
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
            {apiError && (
              <div className="bg-rose-500 mb-3 rounded p-3 text-white">
                {apiError}
              </div>
            )}
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

            {expert && (
              <>
                <label
                  className="block text-sm font-bold mb-2 text-teal-500"
                  htmlFor="email"
                >
                  Tipo
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="
                appearance-none
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-500
                bg-white
                bg-clip-padding
                bg-no-repeat
                border border-solid
                border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                mb-3
                focus:text-teal-700
                focus:bg-white
                focus:border-teal-500
                focus:outline-none"
                >
                  <option>AQUICULTOR</option>
                  <option>APICULTOR</option>
                  <option>AVICULTOR</option>
                  <option>AGRONOMO</option>
                  <option>ENGENHEIRO FLORESTAL</option>
                  <option>PECUARISTA</option>
                  <option>VETERINÁRIO</option>
                  <option>ZOOTÉCNICO</option>
                </select>
              </>
            )}

            <div className="flex items-center justify-between">
              <button
                className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={loading}
              >
                Cadastrar
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

export default Cadastrar;
