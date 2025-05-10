import Head from 'next/head';
import Link from 'next/link';
import ModelGrid from '@/components/feed/modelGrid';

export default function Feed() {
  return (
    <>
      <Head>
        <title>Listado de modelos | AR ACADEMY</title>
        <meta name="description" content="Agencia de modelos" />
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className="feed__master"
        style={{
          backgroundColor: '#fff',
          minHeight: '100vh',
        }}
      >
       
       <ModelGrid></ModelGrid>
      </div>
    </>
  );
}
