import Link from 'next/link';
import React, { useEffect } from 'react';
import Sun from '../assets/icons/sun.svg';
import useUser from '@/recoil/user/useUser';
import { POTION_PASSWORD_KEY } from '@/constants/localStorage';
import { useRouter } from 'next/router';

type Props = {};

export default function Header({}: Props) {
  const { isAdmin, setAdmin } = useUser();
  const router = useRouter();
  useEffect(() => {
    const potionPassword = localStorage.getItem(POTION_PASSWORD_KEY);
    setAdmin(potionPassword == process.env.NEXT_PUBLIC_POTION_PASSWORD);
  }, [setAdmin]);
  return (
    <nav className={`fixed w-full h-64 bg-element1`}>
      <div className='w-full h-full px-16 flex-between max-w-[1024px] lg:mx-auto lg:px-0'>
        <Link href={'/'} className='font-cf-star text-30'>
          개발 실록
        </Link>
        <div className='flex-center gap-20'>
          <div className='cursor-pointer'>
            <Sun />
          </div>
          <Link href={'/about'} className='font-cf-star text-30'>
            About
          </Link>
          {isAdmin && (
            <button onClick={() => router.push('/write')} className='font-cf-star text-26'>
              글쓰기
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
