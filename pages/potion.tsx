import { POTION_KEY } from '@/constants/localStorage';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

type Props = {};

export default function Potion({}: Props) {
  const router = useRouter();
  useEffect(() => {
    const input = prompt('향기로운 마법을 일으키는 바람의 속삭임');
    const potion = process.env.NEXT_PUBLIC_POTION;
    if (input == potion) {
      localStorage.setItem(POTION_KEY, potion);
    } else {
      localStorage.removeItem(POTION_KEY);
    }
    router.replace('/');
  });
  return <div></div>;
}
