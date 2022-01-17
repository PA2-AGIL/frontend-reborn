import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import Footer from '../../components/footer';
import { Input } from '../../components/form';
import Header from '../../components/header';
import { public_api } from '../api/axios';

const Redefinir = () => {
  const router = useRouter();
  const { token } = router.query;

  const [loading, setLoading] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [password2, setPassword2] = React.useState('');
  const [apiError, setApiError] = React.useState('');

  const [errors, setErrors] = React.useState<any>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!!Object.keys(checkError()).length) {
      return;
    }
    try {
      setLoading(true);
      setApiError('');
      await public_api.post(`/forgot-password/reset`, {
        token,
        password,
        passwordConfirm: password2,
      });

      router.push('/entrar');
    } catch (error: any) {
      console.log(error);
      setApiError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const checkError = () => {
    let errs: any = {};

    if (password.length < 2 || password === '')
      errs.password = 'Senha inválida';
    if (password2.length < 2 || password2 === '')
      errs.password2 = 'Senha inválida';
    if (password !== password2) errs.password2 = 'Senhas não correspondem';

    setErrors(errs);

    return errs;
  };

  return (
    <>
      <Head>
        <title>Redefinir</title>
      </Head>
      <Header />

      <div className="flex justify-around">
        <div className="w-full max-w-lg">
          <form
            className="px-8 pt-6 pb-8 mb-4 mt-10"
            onSubmit={(e: React.FormEvent) => {
              handleSubmit(e);
            }}
          >
            {apiError && (
              <h1 className="text-center border mb-5 p-2 rounded text-red-500">
                {apiError}
              </h1>
            )}
            <Input
              name="Senha"
              type="password"
              placeholder="********"
              value={password}
              setValue={setPassword}
              error={errors.password}
            />

            <Input
              name="Confirmar Senha"
              type="password"
              placeholder="********"
              value={password2}
              setValue={setPassword2}
              error={errors.password2}
            />

            <div className="flex items-center justify-between">
              <button
                className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={loading}
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Redefinir;
