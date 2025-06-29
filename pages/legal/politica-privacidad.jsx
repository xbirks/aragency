import ButtonArrow from "@/components/buttons/buttonArrow"
import SeoHead from '@/components/seoHead';

export default function PoliticaPrivacidad() {
  return (
     <>
                    <SeoHead
                    title="Política de privacidad - AR Agency"
                    description="Lee atentamente nuestra política de privacidad e informate."
                    image="https://www.ariannyrivasagency.com/seo/index-cover.jpg"
                    url="https://www.ariannyrivasagency.com"
                    keywords="No disponible"
                  />

    <main>
      <section className="legal__master">
        <h1>Política de Privacidad</h1>
        <p>Versión 29&nbsp;jun&nbsp;2025</p>

        {/* 1. Responsable del tratamiento */}
        <h2>1. Responsable del tratamiento</h2>
        <ul className="legal__lista">
          <li><strong>Titular:</strong>Arianny Rivas – AR Model Agency</li>
          <li><strong>NIF/NIE:</strong>Y4869806F</li>
          <li><strong>Domicilio:</strong>Calle Dolores Alcaide 4, puerta 12, 46007 Valencia (España)</li>
          <li><strong>E-mail:</strong> <a href="mailto:privacy@armodelagency.com">info@ariannyrivasagency.com</a></li>
        </ul>

        {/* 2. Finalidades y bases jurídicas */}
        <h2>2. Finalidades y bases jurídicas</h2>
        <ul className="legal__lista">
          <li><strong>a) Gestionar la solicitud “Ser modelo”</strong> — Consentimiento expreso (art. 6.1.a RGPD).</li>
          <li><strong>b) Enviar futuras oportunidades profesionales</strong> — Interés legítimo (art. 6.1.f RGPD); oposisión en cualquier momento.</li>
          <li><strong>c) Cumplir obligaciones legales</strong> (fiscales, laborales) — Obligación legal (art. 6.1.c RGPD).</li>
        </ul>
        <p>Los campos obligatorios figuran señalados en el formulario. Las fotografías se emplean únicamente para valorar la candidatura.</p>

        {/* 3. Plazos de conservación */}
        <h2>3. Plazos de conservación</h2>
        <ul className="legal__lista">
          <li>Candidaturas no seleccionadas: <strong>24&nbsp;meses</strong> desde su recepción.</li>
          <li>Modelos contratados: datos bloqueados 5&nbsp;años tras la finalización de la relación.</li>
          <li>Registros de consentimiento: mientras existan finalidades o hasta la revocación.</li>
        </ul>

        {/* 4. Destinatarios */}
        <h2>4. Destinatarios</h2>
        <ul className="legal__lista">
          <li><strong>Clientes y productores</strong> para la contratación de perfiles.</li>
          <li><strong>Encargados de tratamiento</strong> (hosting, correo, plataforma de casting) con contrato art. 28 RGPD.</li>
          <li>No se prevén <strong>transferencias internacionales</strong> fuera del EEE salvo proveedores con garantías adecuadas.</li>
        </ul>

        {/* 5. Derechos del interesado */}
        <h2>5. Derechos del interesado</h2>
        <p>
          Puede ejercer acceso, rectificación, supresión, oposición, limitación y portabilidad enviando un e-mail a
          <a href="mailto:privacy@armodelagency.com"> privacy@armodelagency.com</a> con el asunto «Derechos RGPD».
          Si no está conforme, puede reclamar ante la Agencia Española de Protección de Datos (www.aepd.es).
        </p>

        {/* 6. Seguridad de los datos */}
        <h2>6. Seguridad de los datos</h2>
        <ul className="legal__lista">
          <li>El Sitio Web se sirve exclusivamente a través de <strong>HTTPS&nbsp;(TLS&nbsp;1.2+)</strong>.</li>
          <li>Infraestructura desplegada en <strong>Vercel</strong>, proveedor que mantiene controles de seguridad propios.</li>
          <li>Acceso administrativo restringido a un <strong>único usuario</strong> (programador), protegido con contraseña robusta.</li>
          <li><strong>Sin base de datos persistente:</strong> los datos del formulario se envían por correo electrónico y no se almacenan en el servidor.</li>
          <li><strong>Copia de seguridad mensual</strong> del código y contenido estático, almacenada en el mismo servidor y región.</li>
          
        </ul>

        {/* 7. Menores de edad */}
        <h2>7. Menores de edad</h2>
        <p>El registro está restringido a personas <strong>mayores de 18 años</strong>. Se eliminarán inmediatamente los datos de menores detectados.</p>

        {/* 8. Actualizaciones */}
        <h2>8. Actualizaciones de la política</h2>
        <p>
          Podemos modificar esta Política para adaptarla a cambios legislativos o de tratamiento. La versión vigente estará siempre disponible en el Sitio Web.
        </p>

      
        {/* Botón de cierre */}
        <div className="button__cierre">
          <ButtonArrow texto="VOLVER AL INICIO" href="/" />
        </div>
      </section>
    </main>
    </>
  )
}
