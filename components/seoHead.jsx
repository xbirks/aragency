import Head from 'next/head';

export default function SeoHead({
  title = 'AR AGENCY',
  description = 'Agencia de modelos internacionales en España y Estados Unidos.',
  keywords = '',
  url = 'https://www.ariannyrivasagency.com/',
  image = `${url}/seo/index-cover.jpg`,
}) {
  return (
    <Head>
      {/* Básico */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Autoría */}
      <meta name="author" content="Andrés Ortega" />
      <meta name="creator" content="Andrés Ortega" />
      <meta name="publisher" content="Andrés Ortega" />

      {/* Idioma */}
      <meta httpEquiv="Content-Language" content="es" />
      <meta name="language" content="es" />

      {/* Robots */}
      <meta name="robots" content="index, follow" />
      <meta name="revisit-after" content="7 days" />

       {/* Seguridad */}
      <meta
        httpEquiv="Content-Security-Policy"
        content="default-src 'self'; img-src 'self' https://www.ariannyrivasagency.com/; script-src 'self' https://apis.google.com"
      />
      <meta name="referrer" content="no-referrer-when-downgrade" />
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta name="permissions-policy" content="geolocation=(self)" />

      {/* Formato de detección en móviles */}
      <meta
        name="format-detection"
        content="telephone=yes, address=yes, email=yes"
      />

      {/* Theme */}
      <meta name="theme-color" content="#161616" />
      <meta name="background-color" content="#161616" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="AR AGENCY" />
      <meta property="og:locale" content="es_ES" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@aragency" />
      <meta name="twitter:creator" content="@aragency" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={description} />

      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="canonical" href={url} />
      <meta name="language" content="es" />
      <meta name="geo.region" content="ES" />
      <meta name="geo.placename" content="Valencia, España" />
      <meta name="geo.position" content="39.4699;-0.3763" />






      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "http://schema.org",
              "@type": "WebSite",
              "url": "https://www.ariannyrivasagency.com",
              "name": "AR AGENCY"
            },
            {
              "@context": "http://schema.org",
              "@type": "Organization",
              "name": "AR AGENCY",
              "description": "Agencia internacional de modelos en España y Estados Unidos",
              "email": "info@ariannyrivasagency.com",
              "logo": "https://www.ariannyrivasagency.com/android-chrome-512x512.png",
              "url": "https://www.ariannyrivasagency.com"
            },
            {
              "@context": "http://schema.org",
              "@type": "LocalBusiness",
              "logo": "https://www.ariannyrivasagency.com/android-chrome-512x512.png",
              "name": "AR AGENCY",
              "description": "Agencia internacional de modelos con presencia en España y EE.UU.",
              "image": "https://www.ariannyrivasagency.com/seo/index-cover.jpg",
              "url": "https://www.ariannyrivasagency.com",
              "telephone": "+34661855612",
              "priceRange": "$$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Calle Dolores Alcaide 4 puerta 12",
                "addressLocality": "Valencia",
                "addressRegion": "Valencia",
                "postalCode": "46007",
                "addressCountry": "ES"
              }
            }
          ])
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "http://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Inicio",
                "item": "https://www.ariannyrivasagency.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Modelos",
                "item": "https://www.ariannyrivasagency.com/modelos"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "New Faces",
                "item": "https://www.ariannyrivasagency.com/new_faces"
              }
            ]
          })
        }}
      />



    </Head>
  );
}
