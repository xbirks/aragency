import ButtonArrow from "@/components/buttons/buttonArrow"
import SeoHead from '@/components/seoHead';

export default function AvisoLegal() {
  return (
    <>
                    <SeoHead
                    title="Aviso legal - AR Agency"
                    description="Lee atentamente nuestro aviso legal e informate."
                    image="https://www.ariannyrivasagency.com/seo/index-cover.jpg"
                    url="https://www.ariannyrivasagency.com"
                    keywords="No disponible"
                  />

    <main>
      <section className="legal__master">
        <h1>Aviso legal</h1>

      
        <h2>1. Identificación del titular del sitio web</h2>
        <ul className="legal__lista">
          <li><strong>Titular:</strong>Arianny Rivas – AR Model Agency</li>
          <li><strong>NIF/NIE:</strong>Y4869806F</li>
          <li><strong>Domicilio social:</strong>Calle Dolores Alcaide 4, puerta 12, 46007 Valencia (España)</li>
          <li><strong>Correo electrónico:</strong> <a href="mailto:legal@armodelagency.com">info@ariannyrivasagency.com</a></li>
          <li><strong>Teléfono:</strong>661 85 56 12</li>
          <li><strong>Actividad:</strong>Agencia de representación, contratación y gestión de modelos</li>
        </ul>

        <h2>2. Objeto y aceptación</h2>
        <p>
          El presente Aviso Legal regula el acceso y uso del sitio web <strong>www.armodelagency.com</strong>
          (en adelante, el «Sitio Web»). La navegación atribuye la condición de usuario e implica la aceptación
          plena y sin reservas de todas las disposiciones aquí contenidas.
        </p>

    
        <h2>3. Condiciones de uso</h2>
        <ul className="legal__lista">
          <li>Utilizar el Sitio Web conforme a la ley, la moral, el orden público y este Aviso Legal.</li>
          <li>No realizar actividades ilícitas, lesivas de derechos o que puedan dañar, inutilizar o sobrecargar el Sitio Web.</li>
          <li>No introducir ni difundir virus ni emplear técnicas de «hacking», «phishing» o similares.</li>
          <li>AR Model Agency se reserva el derecho de retirar o bloquear el acceso a los usuarios que incumplan estas condiciones.</li>
        </ul>

   
        <h2>4. Propiedad intelectual e industrial</h2>
        <p>
          Todos los contenidos del Sitio Web &mdash;textos, fotografías, gráficos, imágenes, código fuente, etc.&mdash;
          son titularidad de AR Model Agency o de terceros que han autorizado su uso y están protegidos por la normativa
          española e internacional. Queda prohibida su reproducción, distribución o transformación sin autorización previa
          y expresa.
        </p>

     
        <h2>5. Enlaces externos</h2>
        <ul className="legal__lista">
          <li>El Sitio Web puede incluir enlaces a sitios de terceros para facilitar al usuario la búsqueda de información.</li>
          <li>AR Model Agency no se responsabiliza del contenido ni del estado de dichos sitios.</li>
        </ul>


        <h2>6. Responsabilidad</h2>
        <ul className="legal__lista">
          <li>No se garantiza la disponibilidad continua ni la infalibilidad del Sitio Web.</li>
          <li>AR Model Agency excluye, en la máxima medida permitida por la ley, la responsabilidad por daños derivados de la falta de disponibilidad.</li>
          <li>El usuario responderá de los daños que AR Model Agency sufra por incumplimiento de este Aviso Legal.</li>
        </ul>

        <h2>7. Protección de datos personales</h2>
        <p>
          Los datos personales recabados se tratarán conforme al Reglamento&nbsp;(UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018
          (LOPDGDD). Para más información, consulte la Política de Privacidad.
        </p>


        <h2>8. Política de cookies</h2>
        <p>
          Este Sitio Web utiliza cookies propias y de terceros con fines técnicos, analíticos y publicitarios.
          El usuario puede configurar o rechazar las cookies a través del banner de consentimiento.
        </p>

   
        <h2>9. Edad mínima del usuario</h2>
        <p>Los servicios ofrecidos están dirigidos exclusivamente a personas mayores de 18 años.</p>


        <h2>10. Legislación aplicable y jurisdicción</h2>
        <p>
          Este Aviso Legal se rige por la legislación española. Para cualquier controversia serán competentes los Juzgados
          y Tribunales de Valencia, salvo normativa imperativa en contrario.
        </p>

    
        <div className="button__cierre">
          <ButtonArrow texto="VOLVER AL INICIO" href="/" />
        </div>
      </section>
    </main>
    </>
  )
}
