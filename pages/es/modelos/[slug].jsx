import { useRouter } from 'next/router';
import models from '../../../data/models.json';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import ButtonArrow from '@/components/buttons/buttonArrow.jsx';
import ar_logo_white from '@/public/assets/AR_Vector_White.svg';
import { motion, AnimatePresence } from 'framer-motion';

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
            <button onClick={() => setShowGallery(0)}>PORTFOLIO</button>

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

            <p dangerouslySetInnerHTML={{ __html: model.description }} />
          </div>












      <AnimatePresence>

        {showGallery !== false && (

          <motion.div
            className="ficha__portfolio"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <Image
              src={ar_logo_white}
              alt="logotipo AR Agency agencia de modelos en Valencia"
              className="ficha__logo"
            />

            <button
              className="ficha__close"
              onClick={() => setShowGallery(false)}
              aria-label="Cerrar portfolio"
            >
              <img src="/assets/close.svg" alt="Cerrar" />
            </button>

            <button
              className="ficha__nav ficha__nav--prev"
              onClick={() =>
                setShowGallery((prev) => (prev > 0 ? prev - 1 : model.gallery.length - 1))
              }
              aria-label="Anterior"
            >
              <img src="/assets/arrow_black.svg" alt="Anterior" />
            </button>

            <button
              className="ficha__nav ficha__nav--next"
              onClick={() => setShowGallery((prev) => (prev + 1) % model.gallery.length)}
              aria-label="Siguiente"
            >
              <img src="/assets/arrow_black.svg" alt="Siguiente" />
            </button>

            <div className="ficha__media">
              {model.gallery[showGallery].type === 'video' ? (
                <video src={model.gallery[showGallery].src} autoPlay loop muted playsInline />
              ) : (
                <img src={model.gallery[showGallery].src} alt={`gallery-${showGallery}`} />
              )}
            </div>
          </motion.div>
        )}

      </AnimatePresence>







      </div>
    </>
  );
}
