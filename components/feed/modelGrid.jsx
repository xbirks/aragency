// components/ModelGrid.jsx
import { useState, useEffect, useMemo } from 'react';
import ModelCard from './modelCard';
import data from '../../data/models.json';

export default function ModelGrid() {
  const fullData = useMemo(() => data, []); 

  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState(fullData);

  useEffect(() => {
    const q = query.toLowerCase();

    const matches = fullData.filter(model => {
      return (
        model.name.toLowerCase().includes(q) ||
        model.hair.toLowerCase().includes(q) ||
        model.eyes.toLowerCase().includes(q) ||
        model.skin.toLowerCase().includes(q) ||
        model.height.toString().includes(q) ||
        model.bust.toString().includes(q) ||
        model.waist.toString().includes(q) ||
        model.hips.toString().includes(q)
      );
    });

    setFiltered(matches);
  }, [query, fullData]);
  return (
    <div className="model__feed-master">
      <input
        className="model__buscador"
        type="text"
        placeholder="BUSCADOR"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        />

    <div className="model__feed">
  {filtered
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(model => (
      <ModelCard key={model.slug} model={model} />
    ))}
</div>
    </div>
  );
}
