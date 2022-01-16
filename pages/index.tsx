import Head from 'next/head';
import Header from '../components/header';

export default function Home() {
  return (
    <div className="w-full h-screen bg-primary-lighteen">
      <Head>
        <title>Agil-PA2</title>
      </Head>
      <div className="container mx-auto">
        <Header />
      </div>
    </div>
  );
}
