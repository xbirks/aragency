import { useRouter } from 'next/router';
import dataRaw from '../../../data/models.json';
import { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import ButtonArrow from '@/components/buttons/buttonArrow.jsx';
import ar_logo_white from '@/public/assets/AR_Vector_White.svg';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * =============================================================
 * ModeloPage – versión corregida
 * =============================================================
 * • preparedGallery se calcula antes de los callbacks =>
 *   evita “Cannot access ... before initialization”.
 * • Todas las referencias de límite usan preparedGallery.length.
 * • Loader con fade‑in/fade‑out durante la carga.
 * =============================================================
 */

const models = Array.isArray(dataRaw) ? dataRaw : dataRaw.default || [];

export async function getStaticPaths() {
  const paths = models.map(model => ({ params: { slug: model.slug } }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const model = models.find(m => m.slug === params.slug);
  if (!model) return { notFound: true };
  return { props: { model } };
}

export default function ModeloPage({ model }) {
  /* ───────────────────────────  state  ───────────────────── */
  const [galleryType, setGalleryType] = useState(null);   // 'portfolio' | 'digitales' | 'video' | null
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isMobile, setIsMobile]   = useState(false);      // breakpoint 768
  const [isLoading, setIsLoading] = useState(true);       // loader overlay

  /* ───────────────────  detectar tamaño viewport  ────────── */
  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth <= 768);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  /* ───────────────────  construir galería efectiva  ──────── */
  const currentGallery =
    galleryType === 'portfolio' ? model.gallery || [] :
    galleryType === 'digitales' ? model.digitales || [] :
    galleryType === 'video'     ? model.videoGallery || [] :
    [];

  const isVideoGallery = galleryType === 'video';

  const preparedGallery = isVideoGallery
    ? currentGallery
    : currentGallery.flatMap(item => {
        if (Array.isArray(item.src)) {
          return isMobile
            ? item.src.map(src => ({ type: 'image', src }))
            : [item];
        }
        return [item];
      });

  const media = preparedGallery[galleryIndex] || null;

  /* ───────────────────  callbacks navega & teclado  ──────── */
  const nextMedia = useCallback(() => {
    setGalleryIndex(i => (i + 1) % preparedGallery.length);
  }, [preparedGallery.length]);

  const prevMedia = useCallback(() => {
    setGalleryIndex(i => (i > 0 ? i - 1 : preparedGallery.length - 1));
  }, [preparedGallery.length]);

  /* reset index si cambia preparedGallery y se sale de rango */
  useEffect(() => {
    if (galleryIndex >= preparedGallery.length) setGalleryIndex(0);
  }, [preparedGallery.length, galleryIndex]);

  /* teclado */
  useEffect(() => {
    if (!galleryType) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextMedia();
      else if (e.key === 'ArrowLeft') prevMedia();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [galleryType, nextMedia, prevMedia]);

  /* loader activo al cambiar media */
  useEffect(() => { if (galleryType) setIsLoading(true); }, [galleryIndex, galleryType]);

  /* ───────────────────────────  render  ──────────────────── */
  return (
    <>
      <Head><title>{`${model.name} – AR AGENCY`}</title></Head>

      <div className="ficha__master">
        {/* Hero */}
        <motion.div layoutId={`hero-${model.slug}`} className="ficha__hero">
          {model.hero?.endsWith('.mp4') ? (
            <video src={model.hero} autoPlay loop muted playsInline className="ficha__hero-media" />
          ) : (
            <img src={model.hero} alt={model.name} className="ficha__hero-media" />
          )}
          <h1>{model.name}</h1>
          {/* botones galería */}
          <nav className="ficha__botones">
            {model.gallery?.length > 0 && <button onClick={() => {setGalleryType('portfolio'); setGalleryIndex(0);}}>PORTFOLIO</button>}
            {model.digitales?.length > 0 && <button onClick={() => {setGalleryType('digitales'); setGalleryIndex(0);}}>DIGITALES</button>}
            {model.videoGallery?.length > 0 && <button onClick={() => {setGalleryType('video'); setGalleryIndex(0);}}>VIDEO</button>}
          </nav>
        </motion.div>

        {/* Stats */}
        <div className="ficha__stats">
          <span className="stat__title">ALTURA <span className="stat__data">{model.height} cm</span></span>
          <span className="stat__title">PECHO <span className="stat__data">{model.bust} cm</span></span>
          <span className="stat__title">CINTURA <span className="stat__data">{model.waist} cm</span></span>
          <span className="stat__title">CADERA <span className="stat__data">{model.hips} cm</span></span>
          <span className="stat__title">CABELLO <span className="stat__data">{model.hair}</span></span>
          <span className="stat__title">OJOS <span className="stat__data">{model.eyes}</span></span>
          <span className="stat__title">ZAPATOS <span className="stat__data">{model.shoes} EU</span></span>
        </div>

        {/* Opciones de galería */}
        <div className="ficha__galeria-opciones">
          {model.gallery?.length > 0 && (
            <div className="galeria__item" onClick={() => {setGalleryType('portfolio'); setGalleryIndex(0);}} style={{backgroundImage:`url(${model.portfolioCover || '/default-portfolio.jpg'})`}}>
              <span className="galeria__texto">PORTFOLIO</span>
            </div>) }
          {model.digitales?.length > 0 && (
            <div className="galeria__item" onClick={() => {setGalleryType('digitales'); setGalleryIndex(0);}} style={{backgroundImage:`url(${model.digitalesCover || '/default-digitales.jpg'})`}}>
              <span className="galeria__texto">DIGITALES</span>
            </div>) }
          {model.videoGallery?.length > 0 && (
            <div className="galeria__item" onClick={() => {setGalleryType('video'); setGalleryIndex(0);}} style={{backgroundImage:`url(${model.videoCover || '/default-video.jpg'})`}}>
              <span className="galeria__texto">VIDEO</span>
            </div>) }
        </div>

        {/* Descripción */}
        <div className="ficha__description">
          <div>
            <h2>{model.name}</h2>
            <ButtonArrow href="mailto:info@ariannyrivasagency.com" texto="Contratar" />
          </div>
          <p dangerouslySetInnerHTML={{ __html: model.description }} />
        </div>

        {/* Galería modal */}
        <AnimatePresence>
          {galleryType && media && (
            <motion.div className="ficha__portfolio" initial={{y:'100%',opacity:1}} animate={{y:0,opacity:1}} exit={{y:'100%',opacity:1}} transition={{duration:1,ease:[0.33,1,0.68,1]}}>

             

              {/* Logotipo */}
              <Image
                src={ar_logo_white}
                alt="logotipo AR"
                className="ficha__logo"
              />

              {/* Cerrar */}
              <button
                className="ficha__close"
                onClick={() => setGalleryType(null)}
                aria-label="Cerrar"
              >
                <img src="/assets/close.svg" alt="Cerrar" />
              </button>

              {/* Prev / Next */}
              <button
                className="ficha__nav ficha__nav--prev"
                onClick={prevMedia}
                aria-label="Anterior"
              >
                <img src="/assets/arrow_black.svg" alt="Anterior" />
              </button>
              <button
                className="ficha__nav ficha__nav--next"
                onClick={nextMedia}
                aria-label="Siguiente"
              >
                <img src="/assets/arrow_black.svg" alt="Siguiente" />
              </button>

              {/* Media */}
              <div
                className={`ficha__media ${
                  Array.isArray(media.src) ? 'media--pair' : ''
                }`}
              >
                {media.type === 'video' ? (
                  <motion.video
                    key={media.src}
                    src={media.src}
                    autoPlay
                    loop
                    playsInline
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isLoading ? 0 : 1 }}
                    onLoadedData={() => setIsLoading(false)}
                  />
                ) : Array.isArray(media.src) ? (
                  media.src.map((src, i) => (
                    <motion.img
                      key={i}
                      src={src}
                      alt={`Portfolio ${model.name} ${i + 1}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isLoading ? 0 : 1 }}
                      onLoad={() => setIsLoading(false)}
                    />
                  ))
                ) : (
                  <motion.img
                    key={media.src}
                    src={media.src}
                    alt={`Digital ${model.name}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isLoading ? 0 : 1 }}
                    onLoad={() => setIsLoading(false)}
                  />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
