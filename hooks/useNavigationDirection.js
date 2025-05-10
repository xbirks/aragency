import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

export default function useNavigationDirection() {
  const router = useRouter();
  const [direction, setDirection] = useState('forward');
  const previousPath = useRef(router.pathname);

  useEffect(() => {
    const handleRouteChangeStart = (url) => {
      const prevDepth = previousPath.current.split('/').filter(Boolean).length;
      const nextDepth = url.split('/').filter(Boolean).length;
      setDirection(nextDepth > prevDepth ? 'forward' : 'backward');
      previousPath.current = url;
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
    };
  }, []);

  return direction;
}
