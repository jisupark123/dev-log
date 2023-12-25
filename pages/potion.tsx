import { POTION_PASSWORD_KEY } from '@/constants/localStorage';
import useUser from '@/recoil/user/useUser';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function Potion() {
  const router = useRouter();
  const { setAdmin } = useUser();
  useEffect(() => {
    const input = prompt('향기로운 마법을 일으키는 바람의 속삭임');
    const potionPassword = process.env.NEXT_PUBLIC_POTION_PASSWORD;
    if (input == potionPassword) {
      localStorage.setItem(POTION_PASSWORD_KEY, potionPassword);
      setAdmin(true);
    } else {
      localStorage.removeItem(POTION_PASSWORD_KEY);
      setAdmin(false);
    }
    router.replace('/');
  }, [router, setAdmin]);
  return <div></div>;
}
