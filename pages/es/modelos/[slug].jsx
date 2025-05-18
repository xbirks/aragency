import { useRouter } from 'next/router';
import models from '../../../data/models.json';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import ButtonArrow from '@/components/buttons/buttonArrow.jsx';

export async function getStaticPaths() {
  const paths = models.map(model => ({
    params: { slug: model.slug },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const model = models.find(m => m.slug === params.slug);
  return { props: { model } };
}

export default function ModeloPage({ model }) {
  const router = useRouter();
  const [showGallery, setShowGallery] = useState(false);

 

  return (
    <>
      <Head>
        <title>{`${model.name} – AR AGENCY`}</title>
      </Head>

      <div style={{ }} className="ficha__master">
        {/* Hero */}
        <motion.div layoutId={`hero-${model.slug}`} className="ficha__hero">
          {model.hero?.endsWith('.mp4') ? (
            <video
              src={model.hero}
              autoPlay
              loop
              muted
              playsInline
              className="ficha__hero-media"
            />
          ) : (
            <img
              src={model.hero}
              alt={model.name}
              className="ficha__hero-media"
            />
          )}

          <h1>{model.name}</h1>

          <nav className="ficha__botones">
            <button onClick={() => setShowGallery(true)}>PORTFOLIO</button>
            {model.links?.instagram && (
              <a href={model.links.instagram} target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
            )}
            {model.links?.hire && (
              <a href={`mailto:${model.links.hire.replace(/^mailto:/, '')}?subject=Quiero contratar a ${model.name}&body=Hola, estoy interesado en contratar a ${model.name}. ¿Podéis darme más información?`}>
                CONTRATAR
              </a>
            )}
          </nav>
        </motion.div>



        {/* Stats */}
        <div className="ficha__stats"
        >
          <span className="stat__title">ALTURA <span className="stat__data">{model.height} cm</span></span>
          <span className="stat__title">PECHO <span className="stat__data">{model.bust} cm</span></span>
          <span className="stat__title">CINTURA <span className="stat__data">{model.waist} cm</span></span>
          <span className="stat__title">CADERA <span className="stat__data">{model.hips} cm</span></span>
          <span className="stat__title">CABELLO <span className="stat__data">{model.hair}</span></span>
          <span className="stat__title">OJOS <span className="stat__data">{model.eyes}</span></span>
        </div>




        {/* Galería corta */}
        <div className="ficha__galeria"
  
        >
          {model.media.map((item, i) =>
            item.type === 'video' ? (
              <video
                key={i}
                src={item.src}
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <img
                key={i}
                src={item.src}
                alt={`media-${i}`}
              />
            )
          )}
        </div>





          <div className="ficha__description">
            <div>
              <h2>{model.name}</h2>
              <ButtonArrow href="/" texto="Contratar"></ButtonArrow>
            </div>

            <p>Jasmine Sanders es una modelo latina con una elegancia natural que la distingue. Nacida en Bogotá y actualmente afincada en Valencia, Jasmine ha construido una trayectoria versátil que combina la moda editorial con campañas de contenido digital para marcas emergentes y consolidadas en Europa.
            Su carrera comenzó en sesiones de fotografía lifestyle en Barcelona, pero su proyección internacional llegó tras protagonizar una campaña para una firma de cosmética natural con sede en Berlín. Desde entonces, ha trabajado para marcas de moda sostenible, editoriales independientes y proyectos de contenido UGC en redes sociales, donde conecta con una audiencia diversa gracias a su autenticidad y carisma.
            Con una mirada intensa y una actitud cercana, Jasmine representa la nueva generación de modelos: creativa, adaptable y profundamente conectada con las tendencias culturales y digitales.</p>
          </div>












        {/* Placeholder modal (la galería completa se hace luego) */}
        {showGallery && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0,0,0,0.9)',
              color: 'white',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={() => setShowGallery(false)}
          >
            <p>Galería completa (próximo paso)</p>
          </div>
        )}
      </div>
    </>
  );
}
