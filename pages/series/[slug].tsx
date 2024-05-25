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
import { TSeries } from '@/types/postTypes';
import { pathToSeries, seriesToPath } from '@/utils/seriesPath';
import getPostsGroupbySeries from '@/utils/getPostsGroupbySeries';
import getLastPublishedDateBySeries from '@/utils/getLastUpdatedDateBySeries';
import { seriesDescription } from '@/posts/0_seriesDescription';
import Underline from '@/components/underline';
import ChevronUp from '../../assets/icons/chevron_up.svg';
import ChevronDown from '../../assets/icons/chevron_down.svg';
import { OrderMethod } from '@/types/orderMethod';

interface Props {
  series: TSeries;
  pagination: Omit<PaginationProps, 'basePath'>;
  postCount: number; // 전체 포스트 개수
}

export default function Home({ series, pagination, postCount }: Props) {
  const router = useRouter();
  const order = router.query.order as OrderMethod | undefined;
  const page = router.query.page as string | undefined;
  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      if (isHotKey('mod+/', event)) {
        router.push('/potion');
      }
    });
  });
  return !series ? (
    <Page404 />
  ) : (
    <>
      <div className='px-16  w-full max-w-[700px]'>
        <section className='w-full post-box py-20 px-30 mb-30'>
          <div className='flex items-center justify-between mb-20'>
            <span className='font-bold text-30 text-indigo'>Series</span>
            <div className='text-18 font-semibold text-white gradient-blue py-8 px-12 rounded-8'>
              {postCount}개의 포스트
            </div>
          </div>
          <span className='block font-extrabold text-40 mb-40'>{series.title}</span>
          <div className='flex justify-end'>
            <button
              className='bg-page1 flex justify-center items-center gap-10 py-8 px-12 rounded-8'
              onClick={() =>
                router.push(`${series.path}?order=${order === 'desc' ? 'asc' : 'desc'}&${page ? `page=${page}` : ''}`)
              }
            >
              {order === 'desc' ? (
                <>
                  <ChevronDown color='#6610F2' />
                  <span>내림차순</span>
                </>
              ) : (
                <>
                  <ChevronUp color='#6610F2' />
                  <span>오름차순</span>
                </>
              )}
            </button>
          </div>
        </section>
        <Underline className='mb-30' />

        <div className='flex flex-col items-center gap-10'>
          {series.posts.map((post) => (
            <PostBox key={post.path} {...post} />
          ))}
          <Pagination basePath={series.path} query={order ? `order=${order}` : ''} {...pagination} />
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const order: OrderMethod = ctx.query.order === 'desc' ? 'desc' : 'asc'; // 오름차순이 기본
  const seriesTitle = pathToSeries(ctx.query.slug as string);
  const currentPage = Number(ctx.query.page || 1);
  if (!currentPage) {
    return { props: { posts: [] } };
  }
  const onlySeries = allPosts.filter((p) => p.series);
  const postsGroupbySeries = getPostsGroupbySeries(onlySeries);
  const lastUpdateDateBySeries = getLastPublishedDateBySeries(onlySeries);
  let series: TSeries = {
    title: seriesTitle,
    desc: seriesDescription[seriesTitle] || null,
    lastPublished: lastUpdateDateBySeries[seriesTitle],
    path: `/series/${seriesToPath(seriesTitle)}`,
    posts: postsGroupbySeries[seriesTitle],
  };
  const paginationProps = getPaginationProps(series.posts.length, currentPage, POST_SLICE, PAGE_SLICE);
  const postCount = series.posts.length;
  series.posts = series.posts
    .sort((a, b) =>
      order === 'asc'
        ? Number(new Date(a.publishedAt)) - Number(new Date(b.publishedAt))
        : Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
    )
    .slice(paginationProps.sliceStart, paginationProps.sliceEnd);

  const props: Props = {
    series,
    pagination: paginationProps,
    postCount,
  };

  return { props };
};
