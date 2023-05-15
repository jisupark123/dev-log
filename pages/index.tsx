import React from 'react';
import { allPosts } from '@/.contentlayer/generated';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Page404 from './404';

import PostBox, { PostInfoType } from '@/components/index/postBox';
import Pagination, { PaginationProps } from '@/components/index/pagination';
import Link from 'next/link';

interface Props {
  posts: PostInfoType[];
  pagination: PaginationProps;
}

export default function Home({ posts, pagination }: Props) {
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
        {/* <Link href={'/1'}>
          <Link href={'/2'}>a</Link>
        </Link> */}
        <Pagination {...pagination} />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const currentPage = Number(ctx.query.page || 1);
  if (!currentPage) {
    return { props: { posts: [] } };
  }
  const POST_SLICE = 10; // 한 페이지에 ?개 포스트
  const PAGE_SLICE = 5; // 페이지 버튼 ?개
  const posts: PostInfoType[] = allPosts
    .sort((a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)))
    .slice(currentPage * POST_SLICE - POST_SLICE, currentPage * POST_SLICE)
    .map((p) => ({
      title: p.title,
      description: p.description,
      publishedAt: p.publishedAt,
      keywords: p.keywords || [],
      path: p._raw.flattenedPath,
    }));

  const pageCount = Math.floor((allPosts.length - 1) / POST_SLICE) + 1; // 총 페이지 수 구하기
  const startPage = Math.floor((currentPage - 1) / PAGE_SLICE) * PAGE_SLICE + 1;
  const lastPage = startPage + POST_SLICE - 1 < pageCount ? startPage + POST_SLICE - 1 : pageCount;

  const props: Props = {
    posts,
    pagination: {
      currentPage,
      startPage,
      lastPage,
      pageCount,
    },
  };

  return { props };
};
