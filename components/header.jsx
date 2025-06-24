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
  const isSlug = router.asPath.includes('/modelos/') && router.asPath.split('/').length === 4;


  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isMobile = useMediaQuery({ maxWidth: 600 });
  const isTablet = useMediaQuery({ minWidth: 601, maxWidth: 1024 });

  const animatedProps = {
    filter: isIndex ? 'none' : 'invert(1)',
    width: isSlug
      ? '100px'
      : isMobile
      ? isIndex ? '180px' : '120px'
      : isTablet
      ? isIndex ? '300px' : '200px'
      : isIndex
      ? '450px'
      : '350px',
    top: isIndex ? '10vh' : '0px',
    left: isIndex ? '48vw' : '0px',
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
    cursor: 'pointer', // importante para indicar interactividad
  }}
  onClick={() => router.back()} // aquí vuelve atrás
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
          !isIndex && (
            <div className="menu__mobile">
              <a
                href="https://www.instagram.com/studioar.es/"
                className="menu__instagram"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg width="150" height="35" viewBox="0 0 52 22" fill="none">
                  <path
                    d="M16.5 5.5H16.51M6 1H16C18.76 1 21 3.24 21 6V16C21 18.76 18.76 21 16 21H6C3.24 21 1 18.76 1 16V6C1 3.24 3.24 1 6 1ZM15 10.37C15.12 11.2 14.98 12.05 14.59 12.8C14.21 13.55 13.59 14.15 12.84 14.53C12.09 14.91 11.24 15.04 10.41 14.91C9.58 14.77 8.81 14.38 8.21 13.79C7.62 13.19 7.23 12.42 7.09 11.59C6.96 10.76 7.09 9.91 7.47 9.16C7.85 8.41 8.45 7.79 9.2 7.41C9.95 7.02 10.8 6.88 11.63 7C12.48 7.13 13.26 7.52 13.87 8.13C14.48 8.73 14.87 9.52 15 10.37Z"
                    stroke="#1E1E1E"
                    strokeWidth="0.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>


              <Link href="/" className="menu__hamburger" aria-label="Menú">
                <svg width="29" height="24" viewBox="0 0 100 80" fill="currentColor">
                  <rect width="100" height="4" />
                  <rect y="70" width="100" height="4" />
                </svg>
              </Link>
            </div>
          )
        ) : (
          <div className="menu__links">
            <a href="https://www.instagram.com/ariannyrivasacademy/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <Link href="/">Menú</Link>
          </div>
        )
      )}
    </header>
  );
}
