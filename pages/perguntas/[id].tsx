import { ThumbDownIcon, ThumbUpIcon } from '@heroicons/react/solid';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import AnswerCard from '../../components/answerCard';
import Footer from '../../components/footer';
import { Input } from '../../components/form';
import Header from '../../components/header';
import { UserContext } from '../../context/userContext';
import { private_api } from '../api/axios';

const PerguntaId = () => {
  const router = useRouter();
  const { id } = router.query;
  const { accessToken } = React.useContext(UserContext);
  const [loading, setLoading] = React.useState(false);
  const [reload, setReload] = React.useState(false);
  const [question, setQuestion] = React.useState<any>({});
  const [answer, setAnswer] = React.useState<string>('');

  const respond = async () => {
    try {
      setLoading(true);
      if (answer.length < 2 || answer === '') return;
      const { data } = await private_api.post(`/answer/${id}`, {
        content: answer,
      });
      setAnswer('');
      setReload(!reload);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const like = async () => {
    try {
      const { data } = await private_api.patch(`/question/like/${id}`);
      if (!!data) {
        setReload(!reload);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dislike = async () => {
    try {
      const { data } = await private_api.patch(`/question/dislike/${id}`);
      if (!!data) {
        setReload(!reload);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        const { data } = await private_api.get(`/question/${id}`);
        console.log(data);
        setQuestion(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id, reload]);

  return (
    <div className="h-screen flex flex-col">
      <Head>
        <title>Pergunta</title>
      </Head>
      <Header />

      <main className="container m-auto grow">
        <div className="p-5">
          <h1 className="text-2xl mb-5 text-teal-900">{question.title}</h1>
          <div className="flex mb-5">
            <div className="text-center">
              <ThumbUpIcon
                className="w-10 text-teal-500 hover:cursor-pointer"
                onClick={() => like()}
              />
              <p className="my-2 text-teal-500">
                {String(question.likes - question.dislike)}
              </p>
              <ThumbDownIcon
                className="w-10 text-rose-500 hover:cursor-pointer"
                onClick={() => dislike()}
              />
            </div>
            <div className="grow">
              <div className="flex md:flex-row flex-col-reverse">
                <p className="pl-5 text-teal-500 text-justify flex-1">
                  {question.content}
                </p>

                <div className="flex-1 px-5 pb-2 flex flex-row-reverse justify-between md:flex-col md:justify-start text-right font-semibold text-teal-700">
                  <p>
                    {new Date(question.createdAt).toLocaleDateString('pt-br')}
                  </p>
                  <p>{question.producer?.name}</p>
                </div>
              </div>

              <div className="flex flex-wrap">
                {question.images?.map((image: any, i: number) => {
                  return (
                    <React.Fragment key={i}>
                      <Link href={image} key={i}>
                        <a target="_blank" className="w-2/4 md:w-1/4 p-5">
                          <img src={image} className="shadow border rounded " />
                        </a>
                      </Link>
                    </React.Fragment>
                  );
                })}
              </div>
              <div className="ml-5">
                {question.tags?.map((tag: string, i: number) => {
                  return (
                    <span
                      key={tag + i}
                      className="bg-teal-900 text-white rounded mb-1 mr-1 p-1 text-xs"
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {!!question.answers?.length && (
            <div className="mb-5">
              <h2 className="text-2xl text-teal-700 border-b-2 border-teal-700 pb-2 mb-5">
                {question.answers.length} Resposta
                {!!question.answers.length && `s`}
              </h2>

              {question.answers.map(
                ({ _id, content, owner, createdAt, likes, dislike }: IAns) => {
                  return (
                    <AnswerCard
                      id={_id}
                      key={_id}
                      title={owner.name}
                      description={content}
                      date={createdAt}
                      rate={likes - dislike}
                      reload={reload}
                      setReload={setReload}
                    />
                  );
                }
              )}
            </div>
          )}

          {!question.closed && !!accessToken && (
            <>
              <Input
                name="Sua resposta"
                placeholder="Resposta"
                type="textarea"
                value={answer}
                setValue={setAnswer}
              />
              <div className="flex items-center justify-between">
                <button
                  className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => {
                    respond();
                  }}
                >
                  Responder
                </button>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

interface IAns {
  _id: string;
  content: string;
  createdAt: string;
  likes: number;
  dislike: number;
  owner: {
    name: string;
  };
}

export default PerguntaId;
