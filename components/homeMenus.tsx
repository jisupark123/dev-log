import { cls } from '@/utils/cls';
import { useRouter } from 'next/router';

export const signatureKeywords = ['논문 리뷰']; // 기본적으로 표시되는 키워드
export default function HomeMenus({ activeMenu }: { activeMenu: string }) {
  const router = useRouter();

  const menus: { title: string; handler: () => void }[] = [
    { title: 'ALL', handler: () => router.push('/') },
    { title: 'Series', handler: () => router.push('/series') },
    { title: '논문 리뷰', handler: () => router.push('/keywords/논문-리뷰') },
  ];

  return (
    <div className='flex items-center flex-wrap mb-20'>
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
      {!menus.map((m) => m.title).includes(activeMenu) && (
        <button
          key={activeMenu}
          className={cls('text-18 font-semibold py-8 px-12 rounded-8 text-white bg-indigo')}
          onClick={() => router.push(`/keywords/${activeMenu}`)}
        >
          {activeMenu}
        </button>
      )}
    </div>
  );
}
