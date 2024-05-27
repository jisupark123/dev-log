import React from 'react';
import Header from './header';
import HeadMeta, { HeadMetaProps } from './headMeta';

const Layout = ({ metaTitle, metaDescription, children }: HeadMetaProps & { children: React.ReactNode }) => {
  return (
    <div className={'w-screen min-h-screen bg-page1'}>
      <HeadMeta {...{ metaTitle, metaDescription }} />
      <Header />
      <main className={`flex flex-col items-center pt-94 pb-30`}>{children}</main>
    </div>
  );
};

export default Layout;
