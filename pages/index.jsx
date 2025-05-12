import { useState } from 'react';
import IndexSlider from '../components/index_slider';
import SeoHead from '../components/SeoHead.jsx';

export default function Home() {
  const [activo, setActivo] = useState(null);
  const handleToggle = (pais) => setActivo(prev => (prev === pais ? null : pais));

  return (
    <>
        <SeoHead
        title="AR ACADEMY - Agencia de modelos"
        description="Descubre modelos y creativos emergentes en España y Estados Unidos."
        image="https://aragency.vercel.app/seo/index-cover.jpg"
        url="https://aragency.vercel.app"
        keywords="modelos en España, agencia de modelos, moda, talento, pasarela, fotografía"
      />

      <div
        className="menu__master"
        style={{
          backgroundColor: '#161616',
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
