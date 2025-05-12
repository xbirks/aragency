import SeoHead from '@/components/SeoHead.jsx';
import ModelGrid from '@/components/feed/modelGrid';

export default function Feed() {
  return (
    <>

        <SeoHead
        title="AR Models"
        description="Descubre modelos y creativos emergentes en España y Estados Unidos."
        image="https://aragency.vercel.app/seo/index-cover.jpg"
        url="https://aragency.vercel.app"
        keywords="modelos en España, agencia de modelos, moda, talento, pasarela, fotografía"
      />

      <div
        className="feed__master"
        style={{
          backgroundColor: '#fff',
          minHeight: '100vh',
        }}
      >
       
       <ModelGrid></ModelGrid>
      </div>

      <div className="model__textos">

        <h1>Agencia de modelos en Valencia</h1>

        <p><strong>AR Agency</strong> es una agencia de modelos con sede en <strong>Valencia y Miami</strong>, especializada en representar <strong>talento profesional y semiprofesional</strong> para campañas de moda, publicidad y contenido digital. Trabajamos con marcas que buscan <strong>autenticidad</strong>, impacto y <strong>conexión real con sus audiencias</strong>.</p>

        <p>Nuestra propuesta combina <strong>dirección de talento</strong>, estrategia de contenido y presencia activa en redes sociales. Creamos colaboraciones que van más allá del casting: modelos capaces de <strong>generar contenido (UGC)</strong>, conectar con comunidades y adaptarse a los nuevos formatos de comunicación.</p>

        <p>Nos implicamos de forma cercana en cada proyecto, <strong>cuidando los detalles</strong> y apostando por relaciones duraderas basadas en la <strong>confianza</strong>, la transparencia y la calidad. Esta forma de trabajar nos ha permitido construir un entorno donde tanto clientes como modelos pueden <strong>crecer y evolucionar juntos</strong>.</p>


      </div>
    </>
  );
}
