import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import router from 'next/router';
import { Input } from "../components/form";
import { UserContext } from "../context/userContext";
import { public_api } from "./api/axios";

export default function EntrarEspecialista() {
  const { login } = React.useContext(UserContext);
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState<any>({});

  const { accessToken, logout } = React.useContext(UserContext);

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
      const { data } = await public_api.post('/auth/signin/expert', {
        email,
        password,
      });
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
    <div className="w-full h-screen bg-primary-lighteen">
      <Head>
        <title>Entrar | Especialista</title>
      </Head>
      <div className="w-full h-full m-0">
        <div className="flex w-full h-full justify-between">
          <div className="w-1/2 max-w-2xl bg-primary-dark flex flex-row-reverse justify-items-end">
            <div className="w-2/3 h-full py-10 mx-10 my-auto">
              <Link href={accessToken ? '/perguntas' : '/'}>
                <a className="flex items-center text-white">
                  <h2 className="text-4xl">Ágil</h2>
                  <Image
                    src="/leaf-white.svg"
                    width={50}
                    height={50}
                    objectFit="contain"
                  />
                </a>
              </Link>
              <div className="my-28">
                <h2 className="text-white text-3xl my-10">Entrar como Especialista</h2>
                <form
                  onSubmit={(e: React.FormEvent) => {
                    handleLogin(e);
                  }}
                >
                  <Input
                    name="Email:"
                    placeholder="teste@teste.com"
                    value={email}
                    setValue={setEmail}
                    error={errors.email}
                  />
                  <Input
                    name="Senha:"
                    type="password"
                    placeholder="********"
                    value={password}
                    setValue={setPassword}
                    error={errors.password}
                  />

                  <div className="flex justify-end items-end flex-col">
                    <a
                      className="inline-block align-baseline font-medium text-xl text-secondary-lighteen"
                      href="#"
                    >
                      Esqueceu a senha?
                    </a>
                    <button
                      className="bg-secondary hover:bg-secondary-dark w-52 text-white font-medium py-1 px-6 text-xl mt-8 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Entrar
                    </button>
                    <Link href={'/cadastrar'}>
                      <a
                        className="inline-block align-baseline font-medium text-xl text-secondary-lighteen"
                      >
                        Não possuí uma conta?
                      </a>
                    </Link>
                    <Link href={'/entrar'}>
                      <a
                        className="inline-block align-baseline font-bold text-xl mt-10 text-secondary-lighteen"
                      >
                        Entrar como um Produtor
                      </a>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="w-9/12 flex flex-col items-start justify-center">
            <h2 className="text-6xl ml-10 font-medium">Venha fazer parte da nossa <br/> plataforma!</h2>
            <div className="w-full max-w-lg hidden mx-auto md:block">
              <Image
                src="/register.svg"
                width="100%"
                height="100%"
                layout="responsive"
                objectFit="contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}