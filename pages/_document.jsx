import { Html, Head, Main, NextScript } from "next/document";


export default function Document() {
  return (
    <Html lang="es">
      <Head>
      <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="https://use.typekit.net/cbv1cvv.css"></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
