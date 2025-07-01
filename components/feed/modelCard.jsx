import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ModelCard({ model }) {
  return (
    <Link href={model.url}>
    <motion.div
      className="model__tarjeta"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="model__tarjeta-img">
        <img src={model.images.default} alt={`Foto principal de ${model.name}`} className="model-img-default" />
        <img src={model.images.hover} alt={`Foto secundaria de ${model.name}`} className="model-img-hover" />
      </div>
      <p className="model__tarjeta-name">{model.name}</p>
    </motion.div>
    </Link>
  );
}