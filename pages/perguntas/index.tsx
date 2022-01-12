import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import Footer from '../../components/footer';
import Header from '../../components/header';
import QuestionCard from '../../components/questionCard';
import { private_api } from '../api/axios';

const index = () => {
  const [questions, setQuestions] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await private_api.get('/question/all');
        console.log(data);
        setQuestions(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="h-screen flex flex-col justify-between">
      <Head>
        <title>Perguntas</title>
      </Head>
      <Header />
      <main>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl m-5 text-teal-500 font-bold">Perguntas</h1>
          <Link href={'/perguntas/nova'}>
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
