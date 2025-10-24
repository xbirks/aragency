import ButtonArrow from "@/components/buttons/buttonArrow";
import SeoHead from '@/components/seoHead';

export default function PoliticaDesistimiento() {
  return (
    <>
      <SeoHead
        title="Política de desistimiento y reembolso — The Perfect Model"
        description="Condiciones para ejercer el derecho de desistimiento y solicitar reembolso en la formación online The Perfect Model."
        image="https://www.ariannyrivasagency.com/seo/index-cover.jpg"
        url="https://www.ariannyrivasagency.com"
        keywords="Desistimiento, Reembolso, Formación Online, Contenido digital"
      />

      <main>
        <section className="legal__master">
          <h1>Política de Desistimiento y Reembolso — Formación Online «The Perfect Model»</h1>
          <p>Versión 24&nbsp;oct&nbsp;2025</p>

          <p>
            Esta política regula las condiciones bajo las cuales la clienta puede ejercer su derecho de desistimiento y
            solicitar el reembolso del precio abonado por la Formación Online, conforme a la normativa de consumo vigente.
          </p>

          
        <h2>1. Objeto de la Formación</h2>
        <p>La Formación Online "Tha Perfect Model" es un programa intensivo de <strong>seis (6) meses</strong> dirigido a chicas que se inician en el mundo del modelaje. Incluye acceso a diez (10) módulos de contenido digital, una hoja de ruta estructurada y personalizada según sus objetivos, servicio de acompañamiento personalizado 1 a 1 durante la duración total de la formación, incluyendo mentorías y soporte vía whatsapp.</p>

        <h2>2. Precio Total de la Formación</h2>
        <p>El precio total de la formación es de <strong>tres mil quinientos euros (€3.500).</strong></p>

        <h2>3. Derecho de Desistimiento General (Período de Prueba)</h2>
        <p>De acuerdo con la legislación de protección al consumidor, la clienta tiene derecho a desistir del contrato de compra sin necesidad de justificación en un plazo determinado.</p>

        <h2 className="legal__sublista">A. Plazo de Desistimiento</h2>
        <p>La clienta dispone de un plazo de <strong>catorce (14) días naturales</strong> contados a partir de la fecha de contratación y pago de la Formación para ejercer su derecho de desistimiento.</p>

        <h2 className="legal__sublista">B. Condiciones para el Reembolso Total</h2>
        <p>Para que el reembolso sea <strong>total</strong>, deben cumplirse las siguientes condiciones:
</p>
        <ul className="legal__lista">
          <li>1. La solicitud debe realizarse dentro del plazo de <strong>catorce (14) días naturales.</strong></li>
          <li>2. La clienta <strong>no debe haber consumido o accedido a el contenido digital</strong> de la Formación.</li>
          <li>3. La clienta no debe haber realizado ninguna mentoría 1 a 1 con el equipo de AR Academy.</li>
        </ul>

        <h2>4. Exclusión del Derecho de Desistimiento</h2>
        <p>La legislación establece que el derecho de desistimiento <strong>no será aplicable</strong> en el caso de <strong>suministro de contenido digital que no se preste en un soporte material cuando la ejecución haya comenzado con el consentimiento expreso previo del consumidor y con su reconocimiento de que, en consecuencia, pierde su derecho de desistimiento.</strong></p>

        <p><strong>Por lo tanto, al aceptar esta política y marcar la casilla de "He leído y acepto", la clienta reconoce que:</strong></p>
        <ul className="legal__lista">
          <li>1. La Formación es contenido digital.</li>
          <li>2. El acceso a los módulos y recursos inicia la ejecución del servicio.</li>
          <li>3. Si la clienta accede o descarga el contenido , o si ha transcurrido más de <strong>treinta (30) días naturales</strong> desde la compra, <strong>pierde irrevocablemente su derecho a cualquier tipo de reembolso o desistimiento</strong>, entendiendo que ha accedido al valor principal de la Formación.</li>
          <li>4. Si la clienta asiste a alguna mentoría 1 a 1 con el equipo de AR Academy, <strong>pierde irrevocablemente su derecho a cualquier tipo de reembolso o desistimiento.</strong></li>
        </ul>

        <h2>5. Procedimiento para Solicitar el Desistimiento</h2>
        <p>La solicitud de desistimiento debe realizarse enviando un correo electrónico a <a className="legal__enlace" href="mailto:ariannyrivasacademy@gmail.com">ariannyrivasacademy@gmail.com</a> con el asunto "Solicitud de Desistimiento" e incluyendo la siguiente información:</p>
        <ul className="legal__lista">
          <li><strong>1. Nombre completo de la clienta.</strong></li>
          <li><strong>2. Fecha de contratación.</strong></li>
          <li><strong>3. Motivo de la solicitud (opcional, pero útil para la mejora del servicio).</strong></li>
        </ul>

        <h2>6.Plazo y Forma de Reembolso</h2>
        <p>Si la solicitud cumple con las condiciones establecidas en esta política, el reembolso se efectuará en un plazo máximo de <strong>catorce (14) días naturales</strong> a partir de la fecha en que se haya informado y verificado la decisión de desistimiento. El reembolso se realizará utilizando el mismo medio de pago empleado por la clienta para la transacción inicial, salvo que se acuerde expresamente lo contrario.</p>

        {/* Botón de cierre */}
        <div className="button__cierre">
          <ButtonArrow texto="VOLVER AL INICIO" href="/" />
        </div>
      </section>
    </main>
    </>
  )
}