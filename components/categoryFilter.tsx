import { useState } from 'react';
import ChevronDown from '../assets/icons/chevron_down.svg';
import ChevronUp from '../assets/icons/chevron_up.svg';
import Link from 'next/link';
import { TKeyword } from '@/types/postTypes';
import { useRouter } from 'next/router';
import { cls } from '@/utils/cls';
import { pathToString } from '@/utils/seriesPath';

export default function CategoryFilter({ keywords }: { keywords: TKeyword[] }) {
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const router = useRouter();
  const { keyword } = router.query;
  const decodedKeyword = keyword ? pathToString(keyword as string) : null;
  return (
    <div className='mb-30 flex flex-col gap-10'>
      <button className='flex items-center gap-10' onClick={() => setShowCategoryFilter((prev) => !prev)}>
        {showCategoryFilter ? <ChevronUp /> : <ChevronDown />}
        <span className='text-14 font-normal text-gray'>
          {showCategoryFilter ? '카테고리 숨기기' : '카테고리 펼쳐보기'}
        </span>
      </button>
      {showCategoryFilter && (
        <div className='flex items-center gap-5 flex-wrap'>
          {keywords.map((keyword) => (
            <Link
              key={keyword.title}
              href={keyword.path}
              className={cls(
                'py-3 px-10 rounded-20 text-14',
                decodedKeyword === keyword.title ? 'bg-blue text-white' : 'bg-white text-blue hover:bg-page2'
              )}
            >
              {keyword.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
