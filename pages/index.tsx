import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/header';

export default function Home() {
  return (
    <>
      <Head>
        <title>Agil-PA2</title>
      </Head>
      <Header />
      <div className="flex justify-around flex-col items-center">
        <div className="w-full max-w-lg">
          <Image
            src="/home.svg"
            width="100%"
            height="100%"
            layout="responsive"
            objectFit="contain"
          />
        </div>
        <div className="container text-center">
          <p className="p-5 text-2xl font-bold text-teal-800">
            Um espaço para produtores rurais tirarem suas dúvidas! Especialistas
            de diversas áreas, reunidos para ajudar os pequenos e médios
            produtores. Tudo On-line!
          </p>
        </div>
      </div>
    </>
  );
}

