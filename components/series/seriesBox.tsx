import { TSeries } from '@/types/postTypes';
import Link from 'next/link';

export default function SeriesBox(series: TSeries) {
  return (
    <Link href={series.path} className='v-box w-full px-30 py-20 cursor-pointer'>
      <div className='flex flex-between items-center'>
        <h3 className='text-22 font-bold text-blue mb-10'>{series.title}</h3>
        <div className='gradient-blue py-8 px-12 text-white text-16 font-semibold rounded-8'>
          {series.posts.length}개의 글
        </div>
      </div>
      <div className='text-14 mb-70'>{series.desc}</div>
      <div className='flex-between'>
        <span className='text-14 text-gray'>마지막 업데이트 · {series.lastPublished}</span>
      </div>
    </Link>
  );
}
