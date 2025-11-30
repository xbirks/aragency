import { useState } from 'react';
import SeoHead from '@/components/seoHead';
import ModelGrid from '@/components/feed/modelGrid';
import dataRaw from '@/data/models.json';


export default function Feed() {
  const [showOnlyUGC, setShowOnlyUGC] = useState(false);

  const data = Array.isArray(dataRaw) ? dataRaw : dataRaw.default || [];
  const modelos = data
    .filter(m => m.category === 'model')
    .filter(m => !showOnlyUGC || (m.ugcGallery && m.ugcGallery.length > 0));

  return (
    <>
      <SeoHead
        title="AR Models"
        description="Discover fresh talent and up-and-coming creatives in Spain and the U.S."
        image="https://aragency.vercel.app/seo/index-cover.jpg"
        url="https://aragency.vercel.app"
        keywords="models in Spain, modeling agency, fashion, talent, runway, photography"
      />


      <div
        className="feed__master"
        style={{
          backgroundColor: '#fff',
          minHeight: '100vh',
        }}
      >
        <ModelGrid data={modelos} showOnlyUGC={showOnlyUGC} setShowOnlyUGC={setShowOnlyUGC} />
      </div>

      <div className="model__textos">
        <h1>Model Agency in Miami</h1>

        <p><strong>AR Agency</strong> is a modeling agency based in <strong>Valencia and Miami</strong>, representing both <strong>professional and emerging talent</strong> for fashion campaigns, advertising, and digital content. We partner with brands that value <strong>authenticity</strong> and want to create a <strong>real connection with their audience</strong>.</p>

        <p>We combine <strong>talent management</strong>, content strategy, and a strong social media presence. Our approach goes beyond casting—we work with models who can <strong>create content (UGC)</strong>, engage communities, and adapt to today’s fast-evolving formats.</p>

        <p>We’re hands-on with every project, <strong>focused on the details</strong> and building lasting relationships based on <strong>trust</strong>, transparency, and quality. That mindset has helped us create a space where both clients and models can <strong>grow and evolve together</strong>.</p>
      </div>

    </>
  );
}
