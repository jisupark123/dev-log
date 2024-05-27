import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { pageView } from './gtag';

export default function GoogleAnalyticsEffect({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      pageView(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return <>{children}</>;
}
