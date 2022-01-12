import { ThumbDownIcon, ThumbUpIcon } from '@heroicons/react/solid';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import AnswerCard from '../../components/answerCard';
import Footer from '../../components/footer';
import { Input } from '../../components/form';
import Header from '../../components/header';

const PerguntaId = () => {
  const [question, setQuestion] = React.useState<any>({
    title: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae, delectus.`,
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias omnis quas illum, necessitatibus animi voluptate, itaque earum numquam sed quo commodi amet optio. Iste numquam, rerum, nihil sit perferendis, labore libero quod necessitatibus quos qui officia fuga dolor ratione praesentium ex. Quaerat repellendus officiis illo culpa ex praesentium rem laudantium, ullam mollitia nostrum? Pariatur veniam quos eligendi maiores corrupti magnam, minima quae in ad velit repellendus quasi asperiores quo vitae officiis aperiam dolorem quis incidunt! Soluta reiciendis, perferendis animi quidem consequatur consequuntur expedita numquam aliquid voluptates, inventore non ab! Repellendus iusto dolorum consequuntur quis odio provident ullam aliquam vel. Quasi!`,
  });
  const [answer, setAnswer] = React.useState<string>('');

  return (
    <div className="h-screen flex flex-col">
      <Head>
        <title>Pergunta</title>
      </Head>
      <Header />

      <main className="flex m-auto flex-1 md:container">
        <div className="p-5">
          <h1 className="text-2xl mb-5 text-teal-900">{question?.title}</h1>
          <div className="flex mb-5">
            <div className="text-center">
              <ThumbUpIcon
                className="w-10 text-teal-500 hover:cursor-pointer"
                onClick={() => {}}
              />
              <p className="my-2">0</p>
              <ThumbDownIcon
                className="w-10 text-rose-500 hover:cursor-pointer"
                onClick={() => {}}
              />
            </div>
            <div>
              <div className="flex md:flex-row flex-col-reverse">
                <p className="pl-5 text-teal-500 text-justify">
                  {question.description}
                </p>

                <div className="flex-1 px-5 pb-2 flex flex-row-reverse justify-between md:flex-col md:justify-start text-right font-semibold text-teal-700">
                  <p className="w-28">22/02/2022</p>
                  <p className="">Antonio Carlos</p>
                </div>
              </div>

              <div className="flex flex-wrap">
                <Link href="http://learnenglish.britishcouncil.org/sites/podcasts/files/RS4956_182230177-low_0.jpg">
                  <a target="_blank" className="w-2/4 md:w-1/4 p-5">
                    <img src="http://learnenglish.britishcouncil.org/sites/podcasts/files/RS4956_182230177-low_0.jpg" />
                  </a>
                </Link>
                <Link href="http://learnenglish.britishcouncil.org/sites/podcasts/files/RS4956_182230177-low_0.jpg">
                  <a target="_blank" className="w-2/4 md:w-1/4 p-5">
                    <img src="http://learnenglish.britishcouncil.org/sites/podcasts/files/RS4956_182230177-low_0.jpg" />
                  </a>
                </Link>
                <Link href="http://learnenglish.britishcouncil.org/sites/podcasts/files/RS4956_182230177-low_0.jpg">
                  <a target="_blank" className="w-2/4 md:w-1/4 p-5">
                    <img src="http://learnenglish.britishcouncil.org/sites/podcasts/files/RS4956_182230177-low_0.jpg" />
                  </a>
                </Link>
                <Link href="http://learnenglish.britishcouncil.org/sites/podcasts/files/RS4956_182230177-low_0.jpg">
                  <a target="_blank" className="w-2/4 md:w-1/4 p-5">
                    <img src="http://learnenglish.britishcouncil.org/sites/podcasts/files/RS4956_182230177-low_0.jpg" />
                  </a>
                </Link>
              </div>
            </div>
          </div>

          {true && (
            <div className="mb-5">
              <h2 className="text-2xl text-teal-700 border-b-2 border-teal-700 pb-2 mb-5">
                {1} Resposta{false && `s`}
              </h2>

              <AnswerCard
                title="teste01"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Error in tempora necessitatibus sapiente ex cum eveniet, nihil ratione ea ducimus."
                author="antonio carlos"
                date="2015-03-25"
                rate={-5}
              />
            </div>
          )}

          <Input
            name="Sua resposta"
            placeholder="asdas"
            type="textarea"
            value={answer}
            setValue={setAnswer}
          />
          <div className="flex items-center justify-between">
            <button
              className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Responder
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PerguntaId;
