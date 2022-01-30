import {
  ThumbDownIcon,
  ThumbUpIcon,
  LockOpenIcon,
  LockClosedIcon,
} from '@heroicons/react/solid';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import AnswerCard from '../../components/answerCard';
import Footer from '../../components/footer';
import { Input } from '../../components/form';
import Header, { parseJwt } from '../../components/header';
import PageCounter from '../../components/pageCounter';
import { UserContext } from '../../context/userContext';
import { private_api } from '../api/axios';

const PerguntaId = () => {
  const router = useRouter();
  const { id } = router.query;
  const { accessToken } = React.useContext(UserContext);
  const [loading, setLoading] = React.useState(false);
  const [reload, setReload] = React.useState(false);
  const [question, setQuestion] = React.useState<any>({});
  const [pageAns, setPageAns] = React.useState<any>([]);
  const [answer, setAnswer] = React.useState<string>('');
  const [modal, setModal] = React.useState(false);
  const [maxPage] = React.useState(5);
  const [page, setPage] = React.useState(1);

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

  const close = async () => {
    try {
      const { data } = await private_api.patch(`/question/close/${id}`);
      if (!!data) {
        setReload(!reload);
        setModal(false);
      }
    } catch (error) {
      console.log(error);
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
    if (!!question.answers?.length) {
      const allAns = [...question.answers];

      setPageAns(allAns.slice((page - 1) * maxPage, page * maxPage));
    }
  }, [question, page]);

  React.useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        const { data } = await private_api.get(`/question/${id}`);
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

      {modal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none m-3">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-2xl text-teal-800 font-semibold">
                    Confirmar
                  </h3>
                </div>
                <div className="relative px-5 py-2 flex-auto">
                  <p className="my-2 text-teal-700 text-lg leading-relaxed">
                    Você está prestes a fechar esta pergunta, uma ação que não
                    pode ser desfeita, ao fechar novas respostas nao poderao ser
                    enviadas, deseja continuar?
                  </p>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-rose-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setModal(false)}
                  >
                    Não
                  </button>
                  <button
                    className="bg-teal-500 text-white active:bg-teal-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => close()}
                  >
                    Sim
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      <main className="container m-auto grow">
        <div className="p-5">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl mb-5 text-teal-900">{question.title}</h1>
            <div className="pr-4">
              {question.closed ? (
                <LockClosedIcon className="w-10 text-teal-800" />
              ) : (
                <LockOpenIcon
                  className="w-10 hover:cursor-pointer text-teal-800"
                  onClick={() => {
                    if (question.producer._id === parseJwt(accessToken!).id)
                      setModal(true);
                  }}
                />
              )}
            </div>
          </div>

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
              {pageAns?.map(
                ({ _id, content, owner, createdAt, likes, dislike }: IAns) => {
                  return (
                    <AnswerCard
                      id={_id}
                      key={_id}
                      title={owner.name}
                      description={content}
                      date={createdAt}
                      rate={likes - dislike}
                      expert={
                        owner.hasExpert && question?.tags.includes(owner.type)
                      }
                      reload={reload}
                      setReload={setReload}
                    />
                  );
                }
              )}
              <PageCounter
                disable={page >= Math.ceil(question.answers?.length / maxPage)}
                pageNum={page}
                setPage={setPage}
              />
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
                  disabled={loading}
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
    hasExpert: boolean;
    type: string;
  };
}

export default PerguntaId;
