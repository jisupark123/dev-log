import React from 'react';
import Sun from '../assets/svg/sun.svg';
import Link from 'next/link';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className='w-screen min-h-screen bg-page1'>
      <nav className={`fixed w-full h-64 bg-element1`}>
        <div className='w-full h-full px-16 flex-between max-w-[1024px] lg:mx-auto lg:px-0'>
          <Link href={'/'} className=' font-cf-star text-30'>
            개발 실록
          </Link>
          <div className='flex-center gap-20'>
            <div className='cursor-pointer'>
              <Sun />
            </div>
            <Link href={'/about'} className=' font-cf-star text-30'>
              About
            </Link>
          </div>
        </div>
      </nav>
      <main className={`flex flex-col items-center pt-94 pb-30`}>{children}</main>
    </div>
  );
};

export default Layout;
