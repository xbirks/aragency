import Head from 'next/head';

export default function SeoHead({
  title = 'AR AGENCY',
  description = 'Agencia de modelos internacionales en España y Estados Unidos.',
  keywords = '',
  url = 'https://aragency.vercel.app',
  image = `${url}/seo/og-default.jpg`,
}) {
  return (
    <Head>
      {/* Básico */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="AR ACADEMY" />
      <meta property="og:locale" content="es_ES" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@aragency" />
      <meta name="twitter:creator" content="@aragency" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={description} />
    </Head>
  );
}
