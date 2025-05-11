import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ar_logo_white from '@/public/assets/AR_Vector_White.svg';
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';

export default function Header() {
  const router = useRouter();
  const isIndex = router.pathname === '/';
  const isFeed = router.pathname === '/pages/es/modelos.jsx';

  // Hydration fix
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Responsive breakpoints
  const isMobile = useMediaQuery({ maxWidth: 600 });
  const isTablet = useMediaQuery({ minWidth: 601, maxWidth: 1024 });
  const isDesktop = useMediaQuery({ minWidth: 1025 });

  // Motion animation props
  const animatedProps = {
    filter: isIndex ? 'none' : 'invert(1)',
    width: isMobile
      ? isIndex ? '180px' : '120px'
      : isTablet
      ? isIndex ? '300px' : '200px'
      : isIndex
      ? '450px'
      : '350px',
    top: isIndex ? '10vh' : '0px',
    left: isIndex ? '50vw' : '0px',
    transform: isIndex
      ? isMobile
        ? 'translateX(-90px)'
        : isTablet
        ? 'translateX(-180px)'
        : 'translateX(-260px)'
      : 'translateX(0px)',
  };

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
        animate={animatedProps}
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

      {mounted && (
        isMobile ? (
          !isIndex ? (
            <Link href="/" className="menu__hamburger" aria-label="Menú">
              <svg width="29" height="24" viewBox="0 0 100 80" fill="currentColor">
                <rect width="100" height="5" />
                <rect y="30" width="100" height="5" />
                <rect y="60" width="100" height="5" />
              </svg>
            </Link>
          ) : null
        ) : (
          <div className="menu__links">
            <Link href="https://www.instagram.com/ariannyrivasacademy/">Instagram</Link>
            <Link href="/">Menú</Link>
          </div>
        )
      )}
    </header>
  );
}
