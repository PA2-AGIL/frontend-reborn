import Head from 'next/head';
import Image from 'next/image'
import Header from '../components/header';

export default function Home() {
  return (
    <div className="w-full h-screen bg-primary-lighteen">
      <Head>
        <>
        <title>Agil-PA2</title>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;600&display=swap" rel="stylesheet"></link>
        </>
      </Head>
      <div className="container mx-auto">
        <Header />
        <div className="w-full h-max my-28 flex flex-row justify-center items-center">
          <div className="w-auto">
            <h1 className="text-7xl font-bold">Um espaço para produtores rurais tirarem  suas dúvidas!</h1>
            <p className="text-3xl text-gray">Especialistas de diversas áreas, reunidos para ajudar os pequenos e médios produtores. Tudo On-line!</p>
          </div>
          <div className="w-auto max-w-lg hidden md:block">
            <Image
              src="/home.svg"
              width={1150}
              height={1150}
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
