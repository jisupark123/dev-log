import React, { useEffect } from 'react';
import { Post, allPosts } from '@/.contentlayer/generated';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import isHotKey from 'is-hotkey';
import Page404 from '../404';
import Pagination, { PaginationProps } from '@/components/index/pagination';
import { useRouter } from 'next/router';
import { PAGE_SLICE, POST_SLICE } from '@/constants/pagination';
import getPaginationProps from '@/utils/getPaginationProps';
import HomeMenus from '@/components/homeMenus';
import { seriesDescription } from '@/posts/0_seriesDescription';
import getLastPublishedDateBySeries from '@/utils/getLastUpdatedDateBySeries';
import { seriesToPath } from '@/utils/seriesPath';
import { TPostInfo, TSeries } from '@/types/postTypes';
import SeriesBox from '@/components/series/seriesBox';
import getPostsGroupbySeries from '@/utils/getPostsGroupbySeries';

interface Props {
  series: TSeries[];
  pagination: Omit<PaginationProps, 'basePath'>;
  seriesCount: number; // 전체 시리즈 개수
}

export default function Series({ series, pagination, seriesCount }: Props) {
  const router = useRouter();
  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      if (isHotKey('mod+/', event)) {
        router.push('/potion');
      }
    });
  });
  return !series.length ? (
    <Page404 />
  ) : (
    <>
      <div className='px-16  w-full max-w-[700px]'>
        <HomeMenus activeMenu='Series' />
        <span className='font-normal text-14 text-gray block mb-10'>{seriesCount}개의 시리즈</span>

        <div className='flex flex-col items-center gap-10'>
          {series.map((post) => (
            <SeriesBox key={post.path} {...post} />
          ))}
          <Pagination basePath={'/series'} {...pagination} />
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

  const onlySeries = allPosts.filter((p) => p.series);
  const postsGroupbySeries = getPostsGroupbySeries(onlySeries);
  const lastUpdateDateBySeries = getLastPublishedDateBySeries(onlySeries);
  const series: TSeries[] = Object.keys(postsGroupbySeries).map((key) => ({
    title: key,
    desc: seriesDescription[key] || null,
    lastPublished: lastUpdateDateBySeries[key],
    path: `/series/${seriesToPath(key)}`,
    posts: postsGroupbySeries[key],
  }));

  const paginationProps = getPaginationProps(series.length, currentPage, POST_SLICE, PAGE_SLICE);

  const props: Props = {
    series: series
      .sort((a, b) => Number(new Date(b.lastPublished)) - Number(new Date(a.lastPublished)))
      .slice(paginationProps.sliceStart, paginationProps.sliceEnd),
    pagination: paginationProps,
    seriesCount: series.length,
  };

  return { props };
};
