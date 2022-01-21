import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import Footer from '../../components/footer';
import Header from '../../components/header';
import PageCounter from '../../components/pageCounter';
import QuestionCard from '../../components/questionCard';
import { UserContext } from '../../context/userContext';
import { private_api } from '../api/axios';

const index = () => {
  const { accessToken } = React.useContext(UserContext);
  const [questions, setQuestions] = React.useState([]);
  const [query, setQuery] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [maxPages] = React.useState(1);

  React.useEffect(() => {
    const timer = setTimeout(async () => {
      if (query) {
        const { data } = await private_api.get(`/question/all?query=${query}`);
        setQuestions(data.data);
      } else {
        const { data } = await private_api.get(
          `/question/all?limit=${maxPages}&page=${page}`
        );
        console.log(data);
        setQuestions(data.data);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query, page]);

  return (
    <div className="h-screen flex flex-col justify-between">
      <Head>
        <title>Perguntas</title>
      </Head>
      <Header />
      <main className="grow w-full flex flex-col">
        <input
          placeholder="Buscar"
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:hidden justify-center m-5 mb-2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="flex justify-between items-center">
          <h1 className="text-2xl m-5 text-teal-500 font-bold">Perguntas</h1>
          <input
            placeholder="Buscar"
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hidden md:block"
            onChange={(e) => setQuery(e.target.value)}
          />
          <Link href={accessToken ? '/perguntas/nova' : '/entrar'}>
            <h1 className="text-md font-semibold my-3 mx-5 py-2 px-5 border rounded bg-teal-500 text-white hover:cursor-pointer">
              Nova Pergunta
            </h1>
          </Link>
        </div>
        <div>
          {questions?.map(
            ({
              _id,
              title,
              content,
              likes,
              dislike,
              tags,
              createdAt,
              answers,
            }: IQuestion) => {
              return (
                <QuestionCard
                  key={_id}
                  id={_id}
                  title={title}
                  description={content}
                  rate={Number(likes - dislike)}
                  tags={tags}
                  date={createdAt}
                  answers={answers.length}
                />
              );
            }
          )}
        </div>
        <PageCounter pageNum={page} setPage={setPage} />
      </main>
      <Footer />
    </div>
  );
};

interface IQuestion {
  _id: string;
  title: string;
  content: string;
  closed: boolean;
  createdAt: string;
  updatedAt: string;
  likes: number;
  dislike: number;
  answers: any[];
  images: string[];
  tags: string[];
  producer: any;
}

export default index;
