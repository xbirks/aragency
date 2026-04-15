import SeoHead from '@/components/seoHead';
import ButtonArrow from '@/components/buttons/buttonArrow.jsx';

export default function About() {
  return (
    <>
      <SeoHead
        title="About - AR Agency"
        description="AR Agency es una agencia internacional de modelos y creadoras de contenido con sede en Valencia."
        image="https://www.ariannyrivasagency.com/seo/index-cover.jpg"
        url="https://www.ariannyrivasagency.com/about"
        keywords="sobre AR Agency, agencia de modelos Valencia, creadoras de contenido, AR Academy"
      />

      <div className="about">

        {/* HERO — idéntico a una ficha de modelo */}
        <div className="ficha__master">
          <div className="ficha__hero">
            <img
              src="https://res.cloudinary.com/dpxilazgm/image/upload/v1750784245/portada_alba_mzorfm.jpg"
              alt="Modelo AR Agency"
            />
            <h1>
              NO ENCONTRAMOS TALENTO.
              <br />LO CREAMOS.
            </h1>
          </div>
        </div>

        {/* INTRO */}
        <section className="about__intro">
          <h2 className="about__intro-title">
            <strong>SOMOS AR AGENCY,</strong> UNA AGENCIA INTERNACIONAL DE MODELOS Y CREADORAS DE CONTENIDO CON SEDE EN VALENCIA.
          </h2>

          <p className="about__intro-text">
            CADA TALENTO QUE NOS REPRESENTA HA PASADO POR{' '}
            <a
              href="https://ariannyrivasacademy.com/comunidad"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>AR ACADEMY</strong>
            </a>
            : NUESTRO PROPIO SISTEMA DE FORMACIÓN Y CERTIFICACIÓN. NO INTERMEDIAMOS. FORMAMOS, FILTRAMOS Y GARANTIZAMOS — PARA QUE LAS MARCAS RECIBAN PROFESIONALES LISTAS PARA PASARELAS, CAMPAÑAS DIGITALES Y CONTENIDO QUE CONVIERTE.
          </p>

          <ul className="about__features">
            <li>SIN IMPROVISACIÓN</li>
            <li>SIN RETRASOS</li>
            <li>CON GARANTÍA</li>
          </ul>

          <div className="about__cta">
            <ButtonArrow href="/contacto" texto="Más información" />
            <ButtonArrow href="/es/modelos" texto="Ver portfolios" />
          </div>
        </section>

        {/* STATS */}
        <section className="about__stats">
          <div className="stat">
            <span className="stat__num">+50</span>
            <span className="stat__label">Campañas ejecutadas</span>
          </div>
          <div className="stat">
            <span className="stat__num">+23</span>
            <span className="stat__label">Talentos certificados</span>
          </div>
          <div className="stat">
            <span className="stat__num">100%</span>
            <span className="stat__label">Entregables garantizados</span>
          </div>
        </section>

        {/* BRANDS */}
        <section className="about__brands">
          <h2>Han confiado en nosotras</h2>
          <div className="about__brands-logos">
            <img src="/assets/landing/amazon.png" alt="Amazon" />
            <img src="/assets/landing/garnier.png" alt="Garnier" className="about__brand-garnier" />
            <img src="/assets/landing/vogue.png" alt="Vogue" />
            <img src="/assets/landing/colgate.png" alt="Colgate" />
            <img src="/assets/landing/pantene.png" alt="Pantene" className="about__brand-smaller" />
          </div>
        </section>

      </div>
    </>
  );
}
