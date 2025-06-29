import ButtonArrow from "@/components/buttons/buttonArrow"
import SeoHead from '@/components/seoHead';

export default function NoDisponible() {
  return (
    <>
            <SeoHead
            title="No disponible"
            description="Esta página web no está disponible por el momento"
            image="https://www.ariannyrivasagency.com/seo/index-cover.jpg"
            url="https://www.ariannyrivasagency.com"
            keywords="No disponible"
          />


    <main>
      <section className="legal__master">
        <h1>Muy pronto</h1>

        <p>
          Estamos ultimando los detalles para incorporar talento local a nuestro catálogo. Vuelve en breve para descubrir a nuestros nuevos modelos.
        </p>

<div className="button__cierre">
          <ButtonArrow texto="INICIO" href="/" />
        </div>
      </section>
    </main>
    </>
  )
}
