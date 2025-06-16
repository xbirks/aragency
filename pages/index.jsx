import { useState } from 'react';
import IndexSlider from '../components/index_slider';
import SeoHead from '@/components/seoHead';
import { useEffect } from 'react';

export default function Home() {
  const [activo, setActivo] = useState(null);
  const handleToggle = (pais) => setActivo(prev => (prev === pais ? null : pais));

  useEffect(() => {
  console.log('INDEX mounted');
}, []);

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
          modelos="Modelos"
          modeloslink="/es/modelos"
          nuevas="New faces"
          nuevaslink="/es/modelos"
          isExpanded={activo === 'Spain'}
          onToggle={() => handleToggle('Spain')}
        />
        <IndexSlider
          pais="United States"
          modelos="Models"
          modeloslink="https://ermo.es"
          nuevas="New faces"
          nuevaslink="ermo.es"
          isExpanded={activo === 'United States'}
          onToggle={() => handleToggle('United States')}
        />
      </div>
    </>
  );
}
