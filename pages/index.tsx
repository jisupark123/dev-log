import Link from 'next/link';
import React from 'react';
import { allPosts } from '@/.contentlayer/generated';

const DUMMY_POSTS: PostBoxProps[] = [
  {
    id: 1,
    title: 'Tailwind Css 사용하기',
    desc: 'Tailwind Css 사용법과 간단한 예제에 대해 공유합니다. 하지만 그러나 이렇게 합니다.하하하 뭔데요 어어아어어아wwww  wwwewewe',
    date: 'Apr.18.2023',
    tags: ['tailwind css', 'next.js'],
  },
  { id: 2, title: 'Tailwind Css 사용하기', desc: '', date: 'Apr.18.2023', tags: ['tailwind css', 'next.js'] },
  {
    id: 3,
    title: 'Tailwind Css 사용하기',
    desc: 'Tailwind Css 사용법과 간단한 예제에 대해 공유합니다.',
    date: 'Apr.18.2023',
    tags: ['tailwind css', 'next.js'],
  },
  {
    id: 4,
    title: 'Tailwind Css 사용하기',
    desc: 'Tailwind Css 사용법과 간단한 예제에 대해 공유합니다. 하지만 그러나 이렇게 합니다.하하하 뭔데요 어어아어어아',
    date: 'Apr.18.2023',
    tags: ['tailwind css', 'next.js'],
  },
  {
    id: 5,
    title: 'Tailwind Css 사용하기',
    desc: 'Tailwind Css 사용법과 간단한 예제에 대해 공유합니다.',
    date: 'Apr.18.2023',
    tags: ['tailwind css', 'next.js'],
  },
  {
    id: 6,
    title: 'Tailwind Css 사용하기',
    desc: 'Tailwind Css 사용법과 간단한 예제에 대해 공유합니다.',
    date: 'Apr.18.2023',
    tags: ['tailwind css', 'next.js'],
  },
  {
    id: 6,
    title: 'Tailwind Css 사용하기',
    desc: 'Tailwind Css 사용법과 간단한 예제에 대해 공유합니다.',
    date: 'Apr.18.2023',
    tags: ['tailwind css', 'next.js'],
  },
  {
    id: 6,
    title: 'Tailwind Css 사용하기',
    desc: 'Tailwind Css 사용법과 간단한 예제에 대해 공유합니다.',
    date: 'Apr.18.2023',
    tags: ['tailwind css', 'next.js'],
  },
  {
    id: 6,
    title: 'Tailwind Css 사용하기',
    desc: 'Tailwind Css 사용법과 간단한 예제에 대해 공유합니다.',
    date: 'Apr.18.2023',
    tags: ['tailwind css', 'next.js'],
  },
  {
    id: 6,
    title: 'Tailwind Css 사용하기',
    desc: 'Tailwind Css 사용법과 간단한 예제에 대해 공유합니다.',
    date: 'Apr.18.2023',
    tags: ['tailwind css', 'next.js'],
  },
];
interface PostBoxProps {
  id: number;
  title: string;
  desc: string;
  date: string;
  tags: string[];
}
function PostBox({ id, title, desc, date, tags }: PostBoxProps) {
  return (
    <Link href={`/posts/${id}`}>
      <article className='v-box w-full max-w-[700px] mb-10 px-30 py-20'>
        <h3 className='text-22 font-bold text-blue mb-10'>{title}</h3>
        <div className='text-14 mb-20'>{desc}</div>
        <div className='flex-between'>
          <span className='text-14'>{date}</span>
          <div className='flex-center gap-3'>
            {tags.map((tag) => (
              <div key={tag} className='bg-page1 text-blue py-3 px-10 rounded-20 text-14'>
                {tag}
              </div>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function Home() {
  return (
    <>
      <div className='px-16 '>
        {DUMMY_POSTS.map((post, i) => (
          <PostBox key={i} {...post} />
        ))}
      </div>
    </>
  );
}
