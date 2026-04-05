import { useEffect } from 'react';
import { useRouter } from 'next/router';
import SeoHead from '@/components/seoHead';

export default function SolicitudEnviada() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <SeoHead
        title="Solicitud enviada - AR Agency"
        description="Tu solicitud ha sido enviada correctamente"
        image="https://www.ariannyrivasagency.com/seo/index-cover.jpg"
        url="https://www.ariannyrivasagency.com"
        keywords=""
      />

      <main>
        <section className="legal__master">
          <h1>Solicitud enviada</h1>
          <p>
            Hemos recibido tu solicitud correctamente. Nos pondremos en contacto contigo lo antes posible.
          </p>
          <p className="solicitud__redirect">
            Serás redirigido a la página de inicio en unos segundos.
          </p>
        </section>
      </main>
    </>
  );
}
