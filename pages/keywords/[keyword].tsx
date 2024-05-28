import React, { useEffect } from 'react';
import { allPosts } from '@/.contentlayer/generated';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import isHotKey from 'is-hotkey';
import Page404 from '../404';

import PostBox from '@/components/index/postBox';
import Pagination, { PaginationProps } from '@/components/index/pagination';
import { useRouter } from 'next/router';
import { PAGE_SLICE, POST_SLICE } from '@/constants/pagination';
import getPaginationProps from '@/utils/getPaginationProps';
import HomeMenus from '@/components/homeMenus';
import { TKeyword, TPostInfo } from '@/types/postTypes';
import Layout from '@/components/layout';
import { pathToString, stringToPath } from '@/utils/seriesPath';
import getAllKeywords from '@/utils/getAllKeywords';
import { Key } from 'slate-react/dist/utils/key';
import CategoryFilter from '@/components/categoryFilter';

interface Props {
  posts: TPostInfo[];
  pagination: Omit<PaginationProps, 'basePath'>;
  postCount: number;
  keywords: TKeyword[];
}

export default function Keyword({ posts, pagination, postCount, keywords }: Props) {
  const router = useRouter();
  const { keyword } = router.query;
  const decodedKeyword = pathToString(keyword as string);
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
    <Layout>
      <div className='px-16  w-full max-w-[700px]'>
        <HomeMenus activeMenu={decodedKeyword} />
        <CategoryFilter keywords={keywords} />
        <span className='font-normal text-14 text-gray block mb-10'>총 {postCount}개의 포스트</span>

        <div className='flex flex-col items-center gap-10'>
          {posts.map((post) => (
            <PostBox key={post.path} {...post} />
          ))}
          <Pagination basePath={`/keywords/${keyword}`} {...pagination} />
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const keyword = ctx.query.keyword as string;
  if (!keyword) {
    return { props: { posts: [] } };
  }
  const decodedKeyword = pathToString(keyword);
  const currentPage = Number(ctx.query.page || 1);
  if (!currentPage) {
    return { props: { posts: [] } };
  }

  const matchedPosts = allPosts.filter((post) => post.keywords.includes(decodedKeyword));
  const paginationProps = getPaginationProps(matchedPosts.length, currentPage, POST_SLICE, PAGE_SLICE);
  const posts: TPostInfo[] = matchedPosts
    .sort((a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)))
    .slice(paginationProps.sliceStart, paginationProps.sliceEnd)
    .map((p) => ({
      title: p.title,
      description: p.description,
      publishedAt: p.publishedAt,
      keywords: p.keywords.map((k) => ({ title: k, path: `/keywords/${stringToPath(k)}` })) || [],
      series: p.series || null,
      path: p.path,
    }));

  const props: Props = {
    posts,
    pagination: paginationProps,
    postCount: matchedPosts.length,
    keywords: getAllKeywords(allPosts),
  };

  return { props };
};
