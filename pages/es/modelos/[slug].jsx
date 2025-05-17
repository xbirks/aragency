import { useRouter } from 'next/router';
import models from '../../../data/models.json';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Head from 'next/head';

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
              <a href={model.links.hire}>CONTRATAR</a>
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
