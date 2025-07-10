import SeoHead from '@/components/seoHead';
import ModelGrid from '@/components/feed/modelGrid';
import dataRaw from '@/data/models.json';


export default function Feed() {
  const data = Array.isArray(dataRaw) ? dataRaw : dataRaw.default || [];
  const modelos = data.filter(m => m.category === 'model');

  return (
    <>
      <SeoHead
        title="AR Models"
        description="Modelos en España listas para contratar"
        image="https://www.ariannyrivasagency.com//seo/index-cover.jpg"
        url="https://www.ariannyrivasagency.com/"
        keywords="modelos en España, agencia de modelos, moda, talento, pasarela, fotografía"
      />

      <div
        className="feed__master"
        style={{
          backgroundColor: '#fff',
          minHeight: '100vh',
        }}
      >
        <ModelGrid data={modelos} />
      </div>

      <div className="model__textos">
        <h1>Agencia de modelos en Valencia</h1>

        <p><strong>AR Agency no solo representa modelos: forma talentos con sello propio.</strong>
        <br></br><br></br>
        Cada integrante de nuestra comunidad recibe formación desde la base, lo que garantiza <strong>profesionalismo, autenticidad, calidad y visibilidad digital</strong> en cada paso que da.
        <br></br><br></br>
        Somos una <strong>comunidad internacional de modelos</strong>, con sede en Valencia, que reúne talentos que representan culturas, historias y estilos de todo el mundo. Apostamos por una formación integral, acompañamiento constante y <strong>coaching personalizado,</strong> asegurando que cada perfil esté listo para destacar en <strong>pasarelas, campañas digitales y redes sociales.</strong>
        <br></br><br></br>
        <strong>Quien confía en AR Agency accede a modelos altamente capacitados, versátiles y alineados con las últimas tendencias del mercado.</strong> Ofrecemos un proceso ágil, atención personalizada y resultados de alto impacto visual y emocional. Trabajar con nosotros significa contar con un equipo comprometido en reflejar valores, potenciar la conexión con la audiencia y elevar el valor estético y comunicativo de cada proyecto.
        <br></br><br></br>
        Brindamos <strong>compromiso y un servicio impecable,</strong> pensado para <strong>marcas de moda, fotógrafos, diseñadores, y mentes creativas</strong> que buscan <strong>modelos profesionales con proyección,</strong> tanto a nivel nacional como internacional.
        <br></br><br></br>
        <strong>Nuestros talentos son más que una imagen. Tienen propósito, disciplina y actitud.</strong> Una nueva generación de modelos, libre de estereotipos, está emergiendo. <strong>Y empieza aquí.</strong>
        </p>
      </div>
    </>
  );
}
