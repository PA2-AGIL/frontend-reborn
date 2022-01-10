import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import Footer from '../../components/footer';
import Header from '../../components/header';
import QuestionCard from '../../components/questionCard';

const index = () => {
  const [questions, setQuestions] = React.useState([1]);

  return (
    <div className="h-screen flex flex-col">
      <Head>
        <title>Perguntas</title>
      </Head>
      <Header />
      <main className="h-full">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl m-5 text-teal-500 font-bold">Perguntas</h1>
          <Link href={'/perguntas/nova'}>
            <h1 className="text-md font-semibold my-3 mx-5 py-2 px-5 border rounded bg-teal-500 text-white hover:cursor-pointer">
              Nova Pergunta
            </h1>
          </Link>
        </div>
        <div>
          {questions.map((question) => {
            return (
              <QuestionCard
                id="asdasda"
                title="teste 01"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia magni corporis nulla, dolores aut itaque aperiam cum reprehenderit consequatur similique!"
                rate={1}
                tags={['teste01', 'teste02']}
                date="2011-08-12T20:17:46.384Z"
                answers={20}
              />
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default index;
