import Link from 'next/link';
import SeoHead from '@/components/seoHead';

export default function Home() {
  return (
    <>
      <SeoHead
        title="AR AGENCY - Agencia internacional de modelos y talentos emergentes"
        description="Descubre modelos y promesas emergentes en España para pasarela, UGC y publicidad"
        image="https://www.ariannyrivasagency.com/seo/index-cover.jpg"
        url="https://www.ariannyrivasagency.com"
        keywords="modelos en España, agencia de modelos, moda, talento, pasarela, fotografía"
      />

      <div
        className="menu__master"
        style={{
          backgroundColor: '#161616',
          minHeight: '100vh',
        }}
      >
        <p className="index__intro">
          Comunidad internacional de modelos con sede en Valencia. Formamos talentos con sello propio, listos para pasarelas, campañas digitales y redes sociales.
        </p>

        <Link href="/es/modelos" className="slider__master"><h3>Models</h3></Link>
        <Link href="/es/new_faces" className="slider__master"><h3>New Faces</h3></Link>
        <Link href="/about" className="slider__master"><h3>About</h3></Link>
      </div>
    </>
  );
}
