import { cls } from '@/utils/cls';
import { useRouter } from 'next/router';

type TMenus = 'ALL' | 'Series' | '논문 리뷰' | 'etc';
export default function HomeMenus({ activeMenu }: { activeMenu: TMenus }) {
  const router = useRouter();
  const menus: { title: string; handler: () => void }[] = [
    { title: 'ALL', handler: () => router.push('/') },
    { title: 'Series', handler: () => router.push('/series') },
    { title: '논문 리뷰', handler: () => router.push('/keywords/논문-리뷰') },
    { title: 'etc', handler: () => {} },
  ];

  return (
    <div className='flex items-center mb-20'>
      {menus.map(({ title, handler }) => (
        <button
          key={title}
          className={cls(
            'text-18 font-semibold py-8 px-12 rounded-8',
            activeMenu === title ? 'text-white bg-indigo' : 'text-gray'
          )}
          onClick={handler}
        >
          {title}
        </button>
      ))}
    </div>
  );
}
