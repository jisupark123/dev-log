import React from 'react';
import Header from './header';
import { cls } from '@/lib/client/utils';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className={cls('w-screen min-h-screen bg-page1')}>
      <Header />
      <main className={`flex flex-col items-center pt-94 pb-30`}>{children}</main>
    </div>
  );
};

export default Layout;
