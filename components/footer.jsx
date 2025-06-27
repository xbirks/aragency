import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

export default function Footer() {
  const router = useRouter();
  const isIndex = router.pathname === '/';

  const animatedProps = {
    backgroundColor: isIndex ? '#161616' : '#ffffff',
    color: isIndex ? '#ffffff' : '#161616',
  };

  return (
    <motion.footer
      className="footer__master"
      initial={false}
      animate={animatedProps}
      transition={{ duration: 1 }}
    >
      <ul className="footer__links">
        <li><Link href="/contacto">Contacto</Link></li>
        <li><Link href="/ser-modelo">Quiero ser modelo</Link></li>
        <li><Link href="/aviso-legal">Aviso legal</Link></li>
        <li><Link href="/politica-privacidad">Política de privacidad</Link></li>
        <li><Link href="/cookies">Política de cookies</Link></li>
      </ul>
    </motion.footer>
  );
}
