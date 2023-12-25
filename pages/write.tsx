import useUser from '@/recoil/user/useUser';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function Write() {
  const { isAdmin } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!isAdmin) {
      router.replace('/');
    }
  }, [router, isAdmin]);
  return <div>write</div>;
}
