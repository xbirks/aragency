import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ar_logo_white from '@/public/assets/AR_Vector_White.svg';
import Link from 'next/link';

export default function Header() {
  const router = useRouter();
  const isIndex = router.pathname === '/';
  const isFeed = router.pathname === '/pages/es/modelos.jsx';

  return (
    <header
      className="header__master"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 10,
      }}
    >
      <motion.div
        layoutId="logo"
        className="menu__logo"
        initial={false}
        animate={{
          filter: isIndex ? 'none' : 'invert(1)',
          width: isIndex ? '450px' : '350px',
          left: isIndex ? '50vw' : isFeed ? '0px' : 'initial',
           transform: isIndex ? 'translateX(-260px)' : 'translateX(0px)',
        }}
        transition={{ duration: 1 }}
        style={{
          position: 'relative',
          height: 'auto',
        }}
      >



        <Image
          src={ar_logo_white}
          alt="logotipo AR Agency agencia de modelos en Valencia"
          style={{ width: 'auto', height: 'auto' }}
          priority
        />




      </motion.div>

              <div>
        <Link href="#">Instagram</Link>
        <Link href="/">Menú</Link>
        </div>
    </header>
  );
}
