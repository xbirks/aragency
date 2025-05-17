import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

export default function useNavigationDirection() {
  const router = useRouter();
  const [direction, setDirection] = useState('forward');
  const prevPath = useRef(router.asPath);

  const getDepth = (path) => path.split('/').filter(Boolean).length;

  useEffect(() => {
    const handleRouteChange = (url) => {
      const prevDepth = getDepth(prevPath.current);
      const nextDepth = getDepth(url);
      setDirection(nextDepth > prevDepth ? 'forward' : 'backward');
      prevPath.current = url;
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  return direction;
}
