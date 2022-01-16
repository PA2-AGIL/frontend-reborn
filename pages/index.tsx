import Head from 'next/head';
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
      </div>
    </div>
  );
}
