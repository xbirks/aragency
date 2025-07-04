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
        title="AR AGENCY - Agencia de modelos"
        description="Descubre modelos y promesas emergentes en España, Estados Unidos y LATAM."
        image="https://www.ariannyrivasagency.com/seo/index-cover.jpg"
        url="https://www.ariannyrivasagency.com"
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
          nuevaslink="/es/new_faces"
          isExpanded={activo === 'Spain'}
          onToggle={() => handleToggle('Spain')}
        />
        <IndexSlider
          pais="United States"
          modelos="Models"
          modeloslink="/no-disponible"
          nuevas="New faces"
          nuevaslink="/no-disponible"
          isExpanded={activo === 'United States'}
          onToggle={() => handleToggle('United States')}
        />
        <IndexSlider
          pais="LATAM"
          modelos="Models"
          modeloslink="/no-disponible"
          nuevas="New faces"
          nuevaslink="/no-disponible"
          isExpanded={activo === 'LATAM'}
          onToggle={() => handleToggle('LATAM')}
        />
      </div>
    </>
  );
}
