import Head from 'next/head';
import React from 'react';
import Footer from '../../components/footer';
import { Input } from '../../components/form';
import Header from '../../components/header';

const NewQuestion = () => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');

  const [errors, setErrors] = React.useState<any>({});

  const checkError = () => {
    let errs: any = {};

    if (title.length < 2 || title === '') errs.title = 'Título inválido';
    if (description.length < 2 || description === '')
      errs.description = 'Descrição inválida';

    setErrors(errs);
  };

  return (
    <div className="h-screen flex flex-col">
      <Head>
        <title>Nova Pergunta</title>
      </Head>
      <Header />
      <main className="h-full flex justify-around">
        <div className="w-full max-w-lg">
          <form className="px-8 pt-6 pb-8 mb-4 mt-10">
            <Input
              name="Titulo"
              placeholder="Pergunta 01"
              value={title}
              setValue={setTitle}
              error={errors.title}
            />
            <Input
              name="Descrição"
              placeholder="Descrição da pergunta 01"
              value={description}
              setValue={setDescription}
              error={errors.description}
              type="textarea"
            />
            <div className="flex items-center justify-between">
              <button
                className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => checkError()}
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewQuestion;
