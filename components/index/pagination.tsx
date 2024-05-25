import Link from 'next/link';
import { useRouter } from 'next/router';

import ChevronLeft from '../../assets/icons/chevron_left.svg';
import ChevronRight from '../../assets/icons/chevron_right.svg';
import styles from './pagination.module.css';
import { cls } from '@/utils/cls';

export type PaginationProps = {
  currentPage: number;
  startPage: number;
  lastPage: number;
  pageCount: number;
};

export default function Pagination({ currentPage, startPage, lastPage, pageCount }: PaginationProps) {
  const router = useRouter();
  const onMovePage = (move: 'before' | 'after') => {
    if (move === 'before') {
      if (currentPage !== 1) router.push(`/?page=${currentPage - 1}`);
    } else {
      if (currentPage !== pageCount) router.push(`/?page=${currentPage + 1}`);
    }
  };
  return (
    <div className='v-box flex justify-center items-center gap-8 mt-70 mx-auto px-20 py-14 max-w-[700px]'>
      <div
        className={cls(
          styles['btn'],
          currentPage === 1 ? 'stroke-lightGray cursor-not-allowed' : 'cursor-pointer hover:bg-page1'
        )}
        onClick={() => onMovePage('before')}
      >
        <ChevronLeft />
      </div>
      {Array.from({ length: lastPage - startPage + 1 }, (_, index) => index + 1).map((p) => (
        <Link
          href={`/?page=${p}`}
          key={p}
          className={cls(styles['btn'], 'cursor-pointer', p === currentPage ? 'bg-blue text-white' : 'hover:bg-page1')}
        >
          {p}
        </Link>
      ))}
      <div
        className={cls(
          styles['btn'],
          currentPage === pageCount ? 'stroke-[#c1c1c1] cursor-not-allowed' : 'cursor-pointer hover:bg-page1'
        )}
        onClick={() => onMovePage('after')}
      >
        <ChevronRight />
      </div>
    </div>
  );
}
