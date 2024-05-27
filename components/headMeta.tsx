import Head from 'next/head';

export type HeadMetaProps = {
  metaTitle?: string;
  metaDescription?: string;
};

export default function HeadMeta({ metaTitle, metaDescription }: HeadMetaProps) {
  return (
    <Head>
      <title>{metaTitle ?? '개발 실록'}</title>
      <link rel='icon' href='/favicon.ico' />
      <meta name='description' content={metaDescription ?? 'Jisu의 기술 블로그'} />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <meta property='og:title' content={metaTitle ?? '개발 실록'} />
      <meta property='og:description' content={metaDescription ?? 'Jisu의 기술 블로그'} />
      <meta property='og:type' content='website' />
      {/* <meta property='og:image' content={'/imgs/logo_1.png'} /> */}
      {/* <meta property='og:article:author' content='모두의 사활' /> */}
      <meta name='google-site-verification' content='XIaRQEwciTKFV8e8Ezrgswd0vukQbHcQO6Vt2I-fwtk' />
      <meta name='naver-site-verification' content='ca980a559cda4773ef72df35366730f00096f6ca' />
    </Head>
  );
}
