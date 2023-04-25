import Link from 'next/link';
import React from 'react';
import { allPosts } from '@/.contentlayer/generated';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Page404 from './404';
import ChevronLeft from '../assets/svg/chevron_left.svg';
import ChevronRight from '../assets/svg/chevron_right.svg';
import { cls } from '@/lib/client/utils';
import { useRouter } from 'next/router';

type PostType = {
  title: string;
  description: string;
  publishedAt: string;
  keywords?: string[] | undefined;
  path: string;
};

function PostBox(post: PostType) {
  return (
    <Link href={`/posts/${post.path}`} className='v-box w-full px-30 py-20 max-w-[700px]'>
      <h3 className='text-22 font-bold text-blue mb-10'>{post.title}</h3>
      <div className='text-14 mb-20'>{post.description}</div>
      <div className='flex-between'>
        <span className='text-14'>{post.publishedAt}</span>
        <div className='flex-center gap-3'>
          {post.keywords &&
            post.keywords.map((keyword) => (
              <div key={keyword} className='bg-page1 text-blue py-3 px-10 rounded-20 text-14'>
                {keyword}
              </div>
            ))}
        </div>
      </div>
    </Link>
  );
}

interface Props {
  posts: PostType[];
  page: {
    current: number;
    start: number;
    last: number;
    count: number;
  };
}

export default function Home({ posts, page }: Props) {
  const router = useRouter();

  const onMovePage = (move: 'before' | 'after') => {
    if (move === 'before') {
      if (page.current !== 1) router.push(`/?page=${page.current - 1}`);
    } else {
      if (page.current !== page.count) router.push(`/?page=${page.current + 1}`);
    }
  };
  return !posts.length ? (
    <Page404 />
  ) : (
    <>
      <div className='px-16 w-full'>
        <div className='flex flex-col items-center gap-10 w-full '>
          {posts.map((post) => (
            <PostBox key={post.path} {...post} />
          ))}
        </div>
        <div className='v-box flex justify-center items-center gap-8 mt-70 mx-auto px-20 py-14 max-w-[700px]'>
          <div
            className={cls(
              'page-btn',
              page.current === 1 ? 'stroke-[#c1c1c1] cursor-not-allowed' : 'cursor-pointer hover:bg-page1'
            )}
            onClick={() => onMovePage('before')}
          >
            <ChevronLeft />
          </div>
          {Array.from({ length: page.last - page.start + 1 }, (_, index) => index + 1).map((p) => (
            <Link
              href={`/?page=${p}`}
              key={p}
              className={cls('page-btn cursor-pointer', p === page.current ? 'bg-blue text-white' : 'hover:bg-page1')}
            >
              {p}
            </Link>
          ))}
          <div
            className={cls(
              'page-btn',
              page.current === page.count ? 'stroke-[#c1c1c1] cursor-not-allowed' : 'cursor-pointer hover:bg-page1'
            )}
            onClick={() => onMovePage('after')}
          >
            <ChevronRight />
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const page = Number(ctx.query.page || 1);
  if (!page) {
    return { props: { posts: [] } };
  }
  const POST_SLICE = 10; // 한 페이지에 ?개 포스트
  const PAGE_SLICE = 5; // 페이지 버튼 ?개
  let posts = allPosts.slice(page * POST_SLICE - POST_SLICE, page * POST_SLICE);
  const returnPosts: PostType[] = posts.map((p) => ({
    title: p.title,
    description: p.description,
    publishedAt: p.publishedAt,
    keywords: p.keywords,
    path: p._raw.flattenedPath,
  }));

  const pageCount = Math.floor((allPosts.length - 1) / POST_SLICE) + 1; // 총 페이지 수 구하기
  const start = Math.floor((page - 1) / PAGE_SLICE) * PAGE_SLICE + 1;
  const last = start + POST_SLICE - 1 < pageCount ? start + POST_SLICE - 1 : pageCount;

  return {
    props: {
      posts: returnPosts,
      page: {
        current: page,
        start,
        last,
        count: pageCount,
      },
    },
  };
};
