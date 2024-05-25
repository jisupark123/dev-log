import React, { useEffect } from 'react';
import { allPosts } from '@/.contentlayer/generated';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import isHotKey from 'is-hotkey';
import Page404 from './404';

import PostBox from '@/components/index/postBox';
import Pagination, { PaginationProps } from '@/components/index/pagination';
import { useRouter } from 'next/router';
import { PAGE_SLICE, POST_SLICE } from '@/constants/pagination';
import getPaginationProps from '@/utils/getPaginationProps';
import HomeMenus from '@/components/homeMenus';
import { TPostInfo } from '@/types/postTypes';

interface Props {
  posts: TPostInfo[];
  pagination: Omit<PaginationProps, 'basePath'>;
  postCount: number;
}

export default function Home({ posts, pagination, postCount }: Props) {
  const router = useRouter();
  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      if (isHotKey('mod+/', event)) {
        router.push('/potion');
      }
    });
  });
  return !posts.length ? (
    <Page404 />
  ) : (
    <>
      <div className='px-16  w-full max-w-[700px]'>
        <HomeMenus activeMenu='ALL' />
        <span className='font-normal text-14 text-gray block mb-10'>{postCount}개의 포스트</span>

        <div className='flex flex-col items-center gap-10'>
          {posts.map((post) => (
            <PostBox key={post.path} {...post} />
          ))}
          <Pagination basePath='' {...pagination} />
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const currentPage = Number(ctx.query.page || 1);
  if (!currentPage) {
    return { props: { posts: [] } };
  }

  const paginationProps = getPaginationProps(allPosts.length, currentPage, POST_SLICE, PAGE_SLICE);
  const posts: TPostInfo[] = allPosts
    .sort((a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)))
    .slice(paginationProps.sliceStart, paginationProps.sliceEnd)
    .map((p) => ({
      title: p.title,
      description: p.description,
      publishedAt: p.publishedAt,
      keywords: p.keywords || [],
      series: p.series || null,
      path: p.path,
    }));

  const props: Props = {
    posts,
    pagination: paginationProps,
    postCount: allPosts.length,
  };

  return { props };
};
