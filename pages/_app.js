import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import useNavigationDirection from '@/hooks/useNavigationDirection';
import Header from '@/components/header';
import Footer from '@/components/footer';
import '@/styles/style.scss';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const direction = useNavigationDirection();

  const variants = {
    forward: {
      initial: { x: '100%', opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: '-100%', opacity: 0 },
    },
    backward: {
      initial: { x: '-100%', opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: '100%', opacity: 0 },
    },
  };

  return (
    <>
      <Header />
      <AnimatePresence mode="wait">
        <motion.div
          key={router.asPath} 
          initial={variants[direction].initial}
          animate={variants[direction].animate}
          exit={variants[direction].exit}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{ position: 'relative', width: '100%', minHeight: '100vh' }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
      <Footer />
    </>
  );
}
