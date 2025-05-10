import Head from 'next/head';
import { useState } from 'react';
import IndexSlider from '../components/index_slider';

export default function Home() {
  const [activo, setActivo] = useState(null);
  const handleToggle = (pais) => setActivo(prev => (prev === pais ? null : pais));

  return (
    <>
      <Head>
        <title>AR ACADEMY</title>
        <meta name="description" content="Agencia de modelos" />
      </Head>

      <div
        className="menu__master"
        style={{
          backgroundColor: '#000',
          minHeight: '100vh',
        }}
      >
        <IndexSlider
          pais="España"
          modelos="Modelos / Creativos"
          modeloslink="/es/modelos"
          nuevas="nuevos talentos"
          nuevaslink="/es/modelos"
          isExpanded={activo === 'Spain'}
          onToggle={() => handleToggle('Spain')}
        />
        <IndexSlider
          pais="United States"
          modelos="Models / Creatives"
          modeloslink="https://ermo.es"
          nuevas="new talent"
          nuevaslink="ermo.es"
          isExpanded={activo === 'United States'}
          onToggle={() => handleToggle('United States')}
        />
      </div>
    </>
  );
}
