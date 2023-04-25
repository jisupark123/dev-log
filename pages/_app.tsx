import Layout from '@/components/layout';
import '@/styles/globals.css';
import '@/styles/utils.css';
import type { AppProps } from 'next/app';
import localFont from '@next/font/local';

export const cfStarFont = localFont({ src: '../public/fonts/Cafe24Shiningstar.ttf', variable: '--cf-star' });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={cfStarFont.variable}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
