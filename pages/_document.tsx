import GoogleAnalyticsScript from '@/lib/client/ga/googleAnaliticsScript';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='ko'>
      <Head>
        <GoogleAnalyticsScript />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
