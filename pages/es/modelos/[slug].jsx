import { useRouter } from 'next/router';
import dataRaw from '../../../data/models.json';
const models = Array.isArray(dataRaw) ? dataRaw : dataRaw.default || [];

import { useState } from 'react';
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
  const [galleryType, setGalleryType] = useState(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const currentGallery =
    galleryType === 'portfolio'
      ? model.gallery || []
      : galleryType === 'digitales'
      ? model.digitales || []
      : galleryType === 'video'
      ? model.videoGallery || []
      : [];

  const media = currentGallery[galleryIndex] || null;

  return (
    <>
      <Head>
        <title>{`${model.name} – AR AGENCY`}</title>
      </Head>

      <div className="ficha__master">
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
            <button onClick={() => {
              setGalleryType('portfolio');
              setGalleryIndex(0);
            }}>PORTFOLIO</button>

            {model.digitales?.length > 0 && (
              <button onClick={() => {
                setGalleryType('digitales');
                setGalleryIndex(0);
              }}>DIGITALES</button>
            )}

            {model.videoGallery?.length > 0 && (
              <button onClick={() => {
                setGalleryType('video');
                setGalleryIndex(0);
              }}>VIDEO</button>
            )}
          </nav>
        </motion.div>

        <div className="ficha__stats">
          <span className="stat__title">ALTURA <span className="stat__data">{model.height} cm</span></span>
          <span className="stat__title">PECHO <span className="stat__data">{model.bust} cm</span></span>
          <span className="stat__title">CINTURA <span className="stat__data">{model.waist} cm</span></span>
          <span className="stat__title">CADERA <span className="stat__data">{model.hips} cm</span></span>
          <span className="stat__title">CABELLO <span className="stat__data">{model.hair}</span></span>
          <span className="stat__title">OJOS <span className="stat__data">{model.eyes}</span></span>
        </div>

        <div className="ficha__galeria">
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
            <ButtonArrow href="/" texto="Contratar" />
          </div>
          <p dangerouslySetInnerHTML={{ __html: model.description }} />
        </div>

        <AnimatePresence>
          {galleryType && media && (
            <motion.div
              className="ficha__portfolio"
              initial={{ y: '100%', opacity: 1 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 1 }}
              transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
            >
              <Image
                src={ar_logo_white}
                alt="logotipo AR Agency agencia de modelos en Valencia"
                className="ficha__logo"
              />

              <button
                className="ficha__close"
                onClick={() => setGalleryType(null)}
                aria-label="Cerrar portfolio"
              >
                <img src="/assets/close.svg" alt="Cerrar" />
              </button>

              <button
                className="ficha__nav ficha__nav--prev"
                onClick={() =>
                  setGalleryIndex((prev) =>
                    prev > 0 ? prev - 1 : currentGallery.length - 1
                  )
                }
                aria-label="Anterior"
              >
                <img src="/assets/arrow_black.svg" alt="Anterior" />
              </button>

              <button
                className="ficha__nav ficha__nav--next"
                onClick={() =>
                  setGalleryIndex((prev) =>
                    (prev + 1) % currentGallery.length
                  )
                }
                aria-label="Siguiente"
              >
                <img src="/assets/arrow_black.svg" alt="Siguiente" />
              </button>

              <div className="ficha__media">
                {media.type === 'video' ? (
                  <video src={media.src} autoPlay loop muted playsInline />
                ) : (
                  <img src={media.src} alt={`gallery-${galleryIndex}`} />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}