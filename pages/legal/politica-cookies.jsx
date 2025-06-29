import ButtonArrow from "@/components/buttons/buttonArrow"

export default function PoliticaCookies() {
  return (
    <main>
      <section className="legal__master">
        <h1>Política de Cookies</h1>
        <p>Versión 29&nbsp;jun&nbsp;2025</p>

        <h2>1. ¿Qué son las cookies?</h2>
        <p>
          Las cookies son archivos que se descargan en su dispositivo al acceder a determinadas páginas web.
          Permiten, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un
          usuario o de su equipo y, dependiendo de la información que contengan y de la forma en que utilice su
          dispositivo, pueden utilizarse para reconocer al usuario.
        </p>

        <h2>2. Cookies que podrá encontrar en este sitio</h2>
        

        <ul className="legal__lista">
          <li><strong>Google Search Console / Analytics 4</strong> — análisis anónimo de visitas.</li>
          <li><strong>Google Ads</strong> — medición de conversiones y remarketing.</li>
          <li><strong>Meta Ads (Pixel)</strong> — personalización de publicidad en Facebook e Instagram.</li>
        </ul>

        <h2>3. Tabla de cookies previstas</h2>
        <ul className="legal__lista">
          <li><strong>_ga</strong> (Google Analytics) — 2 años — análisis de navegación.</li>
          <li><strong>_gid</strong> (Google Analytics) — 24&nbsp;h — distinción de usuarios.</li>
          <li><strong>_gcl_au</strong> (Google Ads) — 3&nbsp;meses — medición de conversiones.</li>
          <li><strong>IDE</strong> (Google Ads) — 1&nbsp;año — personalización de anuncios.</li>
          <li><strong>_fbp</strong> (Meta Ads) — 90&nbsp;días — entrega de publicidad contextual.</li>
        </ul>

        {/* 4. Gestión del consentimiento */}
        <h2>4. Gestión del consentimiento</h2>
        <ul className="legal__lista">
          <li>Al acceder por primera vez, verá un banner que le permite <strong>Aceptar</strong>, <strong>Rechazar</strong> o <strong>Configurar</strong> las cookies.</li>
          <li>Las cookies de análisis y publicidad solo se instalarán tras su aceptación expresa.</li>
          <li>Podrá modificar o retirar su consentimiento en cualquier momento mediante el enlace «Configurar cookies» en el pie de página.</li>
        </ul>

        {/* 5. Desactivación desde el navegador */}
        <h2>5. Cómo desactivar o eliminar cookies desde su navegador</h2>
        <p>
          Puede restringir, bloquear o borrar las cookies utilizando la configuración de su navegador. Consulte
          las instrucciones de Chrome, Firefox, Safari o Edge para más detalles.
        </p>

        {/* 6. Actualizaciones */}
        <h2>6. Actualizaciones de la Política de Cookies</h2>
        <p>
          AR Agency podrá modificar esta Política cuando se instalen nuevas cookies o cambien los requisitos
          normativos. Cualquier cambio significativo se comunicará a través del banner de consentimiento.
        </p>

        {/* Botón de cierre */}
        <div className="button__cierre">
          <ButtonArrow texto="VOLVER AL INICIO" href="/" />
        </div>
      </section>
    </main>
  )
}
